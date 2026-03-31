package com.depari.mpconcepts

import org.junit.Assert.assertEquals
import org.junit.Test

class ProfileModelTest {
    @Test
    fun `Profile 생성 테스트`() {
        val id = "user1"
        val name = "대원"
        val avatarUrl = "http://example.com/avatar.png"
        
        val profile = Profile(id = id, name = name, avatarUrl = avatarUrl)
        
        assertEquals(id, profile.id)
        assertEquals(name, profile.name)
        assertEquals(avatarUrl, profile.avatarUrl)
    }
}
