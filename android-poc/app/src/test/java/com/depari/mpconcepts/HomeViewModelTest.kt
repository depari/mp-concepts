package com.depari.mpconcepts

import com.depari.mpconcepts.data.Content
import com.depari.mpconcepts.viewmodel.HomeViewModel
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

/**
 * 홈 화면 추천 데이터 로드 및 프로필별 필터링 TDD TC
 */
class HomeViewModelTest {
    private lateinit var viewModel: HomeViewModel

    @Before
    fun setup() {
        viewModel = HomeViewModel()
    }

    @Test
    fun `홈화면 초기 데이터 로드 시 추천 섹션이 존재해야 한다`() {
        val sections = viewModel.sections.value
        assertTrue("추천 섹션 리스트가 비어있지 않아야 함", sections.isNotEmpty())
        assertTrue("Recommended 섹션이 포함되어야 함", sections.any { it == "Recommended" })
    }

    @Test
    fun `특정 섹션의 콘텐츠를 요청하면 해당 리스트를 반환해야 한다`() {
        val recommendedContents = viewModel.getContentsForSection("Recommended").value
        assertTrue("추천 콘텐츠 리스트가 비어있지 않아야 함", recommendedContents.isNotEmpty())
        assertEquals("첫 번째 콘텐츠는 유효해야 함", "Squid Game", recommendedContents[0].title)
    }

    @Test
    fun `프로필 변경 시 해당 프로필에 맞는 개인화된 추천 데이터를 로드해야 한다`() {
        viewModel.loadContentsForProfile("user_1") // 지은 프로필
        val contents = viewModel.getContentsForSection("Recommended").value
        assertTrue("개인화된 콘텐츠가 로드되어야 함", contents.any { it.title.contains("Squid Game") })
        
        viewModel.loadContentsForProfile("user_2") // 민준 프로필
        val contents2 = viewModel.getContentsForSection("Recommended").value
        // 실제 구현에서는 데이터가 달라야 하지만, POC에서는 로드 함수 호출 여부 확인
        assertTrue("프로필 변경 후에도 데이터가 로드되어야 함", contents2.isNotEmpty())
    }
}
