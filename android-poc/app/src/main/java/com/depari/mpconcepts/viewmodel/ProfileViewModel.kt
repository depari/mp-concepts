package com.depari.mpconcepts.viewmodel

import com.depari.mpconcepts.Profile
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class ProfileViewModel {
    private val _profiles = MutableStateFlow<List<Profile>>(emptyList())
    val profiles: StateFlow<List<Profile>> = _profiles.asStateFlow()

    private val _selectedProfile = MutableStateFlow<Profile?>(null)
    val selectedProfile: StateFlow<Profile?> = _selectedProfile.asStateFlow()

    fun setProfiles(list: List<Profile>) {
        _profiles.value = list
    }

    fun selectProfile(id: String) {
        _selectedProfile.value = _profiles.value.find { it.id == id }
    }
}
