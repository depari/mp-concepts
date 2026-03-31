package com.depari.mpconcepts.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.depari.mpconcepts.Profile

/**
 * 프로필 아바타 원형 이미지 컴포넌트.
 * Web 실데이터(avatarUrl) 연동 및 일관된 서클 디자인 제공.
 */
@Composable
fun ProfileAvatar(
    profile: Profile,
    modifier: Modifier = Modifier,
    onClick: (() -> Unit)? = null
) {
    Box(
        modifier = modifier
            .clip(CircleShape)
            .background(Color(profile.panelAccentColor).copy(alpha = 0.2f))
            .border(2.dp, Color.White.copy(alpha = 0.5f), CircleShape),
        contentAlignment = Alignment.Center
    ) {
        // 로컬 리소스 ID 가 있으면 우선 사용, 없으면 URL 사용
        AsyncImage(
            model = profile.drawableResId ?: profile.avatarUrl,
            contentDescription = "Profile Image",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop,
            error = androidx.compose.ui.graphics.painter.ColorPainter(Color.Gray)
        )
    }
}
