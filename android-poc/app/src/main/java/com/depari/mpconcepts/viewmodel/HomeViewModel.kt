package com.depari.mpconcepts.viewmodel

import androidx.lifecycle.ViewModel
import com.depari.mpconcepts.data.Content
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * 홈 화면의 섹션 및 추천 콘텐츠 데이터를 관리하는 ViewModel
 */
class HomeViewModel : ViewModel() {
    private val _sections = MutableStateFlow<List<String>>(listOf("Recommended", "New Releases", "Trending Now"))
    val sections: StateFlow<List<String>> = _sections.asStateFlow()

    private val _contentData = MutableStateFlow<Map<String, List<Content>>>(emptyMap())
    
    init {
        // 기본 데이터 로드
        loadDefaultContents()
    }

    private fun loadDefaultContents() {
        val dummyRecommended = listOf(
            Content("1", "Squid Game", "https://example.com/squid.jpg", 0.7f),
            Content("2", "The Glory", "https://example.com/glory.jpg", 0.45f),
            Content("3", "Physical: 100", "https://example.com/physical.jpg", 0.0f)
        )
        _contentData.value = mapOf("Recommended" to dummyRecommended)
    }

    private val _selectedContent = MutableStateFlow<Content?>(null)
    val selectedContent: StateFlow<Content?> = _selectedContent.asStateFlow()

    fun selectContent(content: Content?) {
        _selectedContent.value = content
    }

    fun getContentsForSection(section: String): StateFlow<List<Content>> {
        return MutableStateFlow(_contentData.value[section] ?: emptyList()).asStateFlow()
    }

    fun setSectionContents(section: String, contents: List<Content>) {
        _contentData.value = _contentData.value.toMutableMap().apply {
            put(section, contents)
        }
    }

    fun loadContentsForProfile(profileId: String) {
        // 실제 구현에서는 프로필별 추천 API 호출
        val personalized = if (profileId == "p1") {
            listOf(
                Content("c1", "오징어 게임", "https://image.tmdb.org/t/p/w500/d99XpA67484B686129F11EBD8BE.jpg", 0.7f, "Thriller"),
                Content("c2", "더 글로리", "https://image.tmdb.org/t/p/w500/6Y7Z713506EDC8B8F1EEBD8BE.jpg", 0.45f, "Drama")
            )
        } else {
            listOf(
                Content("c3", "피지컬: 100", "https://image.tmdb.org/t/p/w500/8X5A713506EDC8B8F1EEBD8BE.jpg", 0.0f, "Variety"),
                Content("c4", "무빙", "https://image.tmdb.org/t/p/w500/2Y4A713506EDC8B8F1EEBD8BE.jpg", 0.0f, "Action")
            )
        }
        setSectionContents("Recommended", personalized)
        setSectionContents("Trending Now", personalized.shuffled())
    }
}
