package com.depari.mpconcepts.data

import org.junit.Assert.assertEquals
import org.junit.Test

class ContentModelTest {
    @Test
    fun `Content 데이터 모델 생성 테스트`() {
        val id = "c1"
        val title = "The Great Movie"
        val subtitle = "Action / 2024"
        val thumbnailUrl = "http://example.com/thumb.png"
        
        val content = Content(id, title, subtitle, thumbnailUrl)
        
        assertEquals(id, content.id)
        assertEquals(title, content.title)
        assertEquals(subtitle, content.subtitle)
        assertEquals(thumbnailUrl, content.thumbnailUrl)
    }
}
