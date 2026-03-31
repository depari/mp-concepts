package com.depari.mpconcepts.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.tv.material3.*
import coil.compose.AsyncImage
import com.depari.mpconcepts.data.Content

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun RecommendedCard(
    content: Content,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var isFocused by remember { mutableStateOf(false) }
    val scale by animateFloatAsState(
        targetValue = if (isFocused) 1.1f else 1.0f,
        animationSpec = tween(durationMillis = 300),
        label = "CardScale"
    )

    Box(
        modifier = modifier
            .width(220.dp)
            .height(124.dp) // 16:9 비율 근사치
            .onFocusChanged { isFocused = it.isFocused }
            .scale(scale)
            .clip(RoundedCornerShape(12.dp))
            .border(
                width = if (isFocused) 3.dp else 0.dp,
                color = if (isFocused) Color.White else Color.Transparent,
                shape = RoundedCornerShape(12.dp)
            )
            .clickable { onClick() }
            .background(Color(0xFF1A1A1A))
    ) {
        // 배경 이미지 (Coil 활용)
        AsyncImage(
            model = content.imageUrl,
            contentDescription = content.title,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop,
            error = androidx.compose.ui.graphics.painter.ColorPainter(Color.DarkGray)
        )

        // 하단 그라데이션 오버레이 (텍스트 가독성)
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.8f)),
                        startY = 150f
                    )
                )
        )

        // 콘텐츠 정보 및 진행률 바
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp),
            verticalArrangement = Arrangement.Bottom
        ) {
            Text(
                text = content.title,
                color = Color.White,
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.Bold,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )

            if (content.progress > 0f) {
                Spacer(modifier = Modifier.height(6.dp))
                // Progress Bar (시청 중 콘텐츠)
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(3.dp)
                        .background(Color.White.copy(alpha = 0.3f), shape = RoundedCornerShape(2.dp))
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth(content.progress)
                            .fillMaxHeight()
                            .background(Color(0xFFE50914), shape = RoundedCornerShape(2.dp)) // Accent Red
                    )
                }
            }
        }
    }
}
