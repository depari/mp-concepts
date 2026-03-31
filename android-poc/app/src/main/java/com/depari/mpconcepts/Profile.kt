package com.depari.mpconcepts

/**
 * Web 프로젝트의 profiles.ts 와 1:1 대응되는 프로필 데이터 모델.
 * 로컬 리소스(drawableResId) 와 외부 URL(avatarUrl) 을 모두 지원합니다.
 */
data class Profile(
    val id: String,
    val name: String,
    val colorTop: Long,
    val colorBottom: Long,
    val avatarUrl: String? = null,
    val drawableResId: Int? = null, // 로컬 아이콘 지원
    val panelAccentColor: Long
)
