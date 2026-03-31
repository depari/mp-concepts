package com.depari.mpconcepts

import org.junit.Assert.assertEquals
import org.junit.Test

class ProfileModelTest {
    @Test
    fun `Profile 생성 테스트`() {
        val id = "user1"
        val name = "대원"
        val avatarUrl = "http://example.com/avatar.png"
        val colorTop = 0xFFF8BBD0L
        val colorBottom = 0xFFF06292L
        val panelAccentColor = 0xFFF06292L
        
        val profile = Profile(id = id, name = name, colorTop = colorTop, colorBottom = colorBottom, avatarUrl = avatarUrl, panelAccentColor = panelAccentColor)
        
        assertEquals(id, profile.id)
        assertEquals(name, profile.name)
        assertEquals(avatarUrl, profile.avatarUrl)
    }
}
