package com.depari.mpconcepts.data

data class Content(
    val id: String,
    val title: String,
    val subtitle: String? = null,
    val thumbnailUrl: String? = null
)
