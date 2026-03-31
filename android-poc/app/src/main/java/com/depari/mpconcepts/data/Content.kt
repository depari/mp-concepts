package com.depari.mpconcepts.data

/**
 * 콘텐츠 데이터 모델.
 * Google TV 홈 추천 및 상세 페이지(Details) 정보를 모두 포함할 수 있도록 정규화.
 */
data class Content(
    val id: String,
    val title: String,
    val subtitle: String? = null,
    val genre: String = "Unknown",
    val description: String? = null,
    val thumbnailUrl: String? = null,
    val imageUrl: String? = null
)
