package com.depari.mpconcepts

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class ProfileViewModelTest {
    @Test
    fun `프로필 리스트 초기화 및 선택 테스트`() {
        val viewModel = ProfileViewModel()
        val profile1 = Profile("id1", "User 1")
        val profile2 = Profile("id2", "User 2")
        
        viewModel.setProfiles(listOf(profile1, profile2))
        
        assertEquals(2, viewModel.profiles.value.size)
        assertNull(viewModel.selectedProfile.value)
        
        viewModel.selectProfile("id1")
        assertEquals(profile1, viewModel.selectedProfile.value)
    }
}
