package com.depari.mpconcepts.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.material3.*
import coil.compose.AsyncImage
import com.depari.mpconcepts.data.Content

/**
 * 홈 화면 상단의 히어로 배너 섹션.
 * 현재 포커스된 또는 선정된 프리미엄 콘텐츠를 전면에 홍보하여 시각적 임팩트를 부여합니다.
 */
@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun HeroSection(
    content: Content?,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(420.dp) // 히어로 섹션 높이 축소 (Row 정렬 고려)
    ) {
        // 배경 이미지 (포스터 스타일)
        content?.let {
            AsyncImage(
                model = it.imageUrl,
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop,
                alpha = 0.5f // 배경용 투명도 조정
            )
        }

        // 그라데이션 오버레이 (텍스트 가독성 + 하단 자연스러운 연결)
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color.Black.copy(alpha = 0.2f),
                            Color.Black.copy(alpha = 0.9f)
                        )
                    )
                )
        )

        // 콘텐츠 텍스트 정보 (웹 스타일: 좌측 정렬, 하단 배치)
        Column(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(start = 58.dp, bottom = 48.dp)
                .width(600.dp)
        ) {
            Text(
                text = content?.genre ?: "PREMIUM PICK",
                color = Color.Cyan.copy(alpha = 0.8f),
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                letterSpacing = 2.sp
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = content?.title ?: "Welcome to MP Concept",
                color = Color.White,
                style = MaterialTheme.typography.displayMedium,
                fontWeight = FontWeight.Bold,
                maxLines = 1
            )
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = content?.description ?: "Discover the latest movies and shows curated uniquely for your profile. Enjoy a cinematic experience tailored to your taste.",
                color = Color.White.copy(alpha = 0.7f),
                style = MaterialTheme.typography.bodyLarge,
                lineHeight = 24.sp,
                maxLines = 2
            )
        }
    }
}
