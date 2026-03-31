package com.depari.mpconcepts.data

/**
 * 홈 화면 추천 섹션의 각 콘텐츠 항목을 나타내는 데이터 모델
 */
data class Content(
    val id: String,
    val title: String,
    val imageUrl: String,
    val progress: Float = 0f, // 시청 진행률 (0.0 ~ 1.0)
    val genre: String = "Action",
    val description: String = ""
)
