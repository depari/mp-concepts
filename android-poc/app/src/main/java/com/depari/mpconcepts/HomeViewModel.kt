package com.depari.mpconcepts

import com.depari.mpconcepts.data.Content
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class HomeViewModel {
    private val sectionMap = mutableMapOf<String, MutableStateFlow<List<Content>>>()

    fun setSectionContents(section: String, contents: List<Content>) {
        if (!sectionMap.containsKey(section)) {
            sectionMap[section] = MutableStateFlow(emptyList())
        }
        sectionMap[section]?.value = contents
    }

    fun getContentsForSection(section: String): StateFlow<List<Content>> {
        return sectionMap[section]?.asStateFlow() ?: MutableStateFlow(emptyList<Content>()).asStateFlow()
    }
}
