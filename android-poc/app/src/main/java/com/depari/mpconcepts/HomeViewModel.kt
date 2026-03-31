package com.depari.mpconcepts

import com.depari.mpconcepts.data.Content
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * 프로젝트 홈 화면 데이터 모델링 및 내비게이션 상태 관리.
 */
class HomeViewModel {
    private val sectionMap = mutableMapOf<String, MutableStateFlow<List<Content>>>()
    
    // 현재 선택된 상세 콘텐츠 상태
    private val _selectedContent = MutableStateFlow<Content?>(null)
    val selectedContent: StateFlow<Content?> = _selectedContent.asStateFlow()

    fun setSectionContents(section: String, contents: List<Content>) {
        if (!sectionMap.containsKey(section)) {
            sectionMap[section] = MutableStateFlow(emptyList())
        }
        sectionMap[section]?.value = contents
    }

    fun getContentsForSection(section: String): StateFlow<List<Content>> {
        return sectionMap[section]?.asStateFlow() ?: MutableStateFlow(emptyList<Content>()).asStateFlow()
    }

    /**
     * 콘텐츠 ID 를 기반으로 현재 선택된 상세 콘텐츠를 갱신합니다.
     */
    fun selectContent(contentId: String) {
        val allContents = sectionMap.values.flatMap { it.value }
        _selectedContent.value = allContents.find { it.id == contentId }
    }
}
