package com.depari.mpconcepts

import com.depari.mpconcepts.data.Content
import org.junit.Assert.assertEquals
import org.junit.Test

class HomeViewModelTest {
    @Test
    fun `홈 화면 섹션별 콘텐츠 관리 테스트`() {
        val viewModel = HomeViewModel()
        val recommendSection = "Recommend"
        val mockContents = listOf(
            Content("1", "Movie 1"),
            Content("2", "Movie 2")
        )
        
        viewModel.setSectionContents(recommendSection, mockContents)
        
        val result = viewModel.getContentsForSection(recommendSection).value
        assertEquals(2, result.size)
        assertEquals("Movie 1", result[0].title)
    }
}
