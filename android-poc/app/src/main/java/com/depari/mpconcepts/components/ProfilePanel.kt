package com.depari.mpconcepts.components

import androidx.compose.animation.*
import androidx.compose.animation.core.animateDpAsState
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
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.material3.*
import coil.compose.AsyncImage
import com.depari.mpconcepts.Profile

/**
 * Web 프로젝트의 아코디언 스타일 프로필 패널을 Android TV Compose 로 재현.
 * 포커스 시 너비가 확장되며 상세 정보가 노출됩니다.
 */
@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun ProfilePanel(
    profile: Profile,
    isFocused: Boolean,
    onFocusChange: (Boolean) -> Unit,
    onClick: () -> Unit,
    modifier: Modifier = Modifier // 외부로부터 Modifier(FocusRequester 등) 전달받음
) {
    // 웹 수치 반영 (12vw -> 44vw 대략적 환산)
    val width by animateDpAsState(
        targetValue = if (isFocused) 450.dp else 120.dp,
        animationSpec = tween(durationMillis = 500),
        label = "WidthAnimation"
    )

    // Web 데이터 연동 (Long -> Color)
    val colorTop = Color(profile.colorTop)
    val colorBottom = Color(profile.colorBottom)

    Box(
        modifier = modifier // 전달받은 modifier 우선 적용
            .width(width)
            .fillMaxHeight()
            .onFocusChanged { onFocusChange(it.isFocused) }
            .clickable { onClick() }
            .background(
                brush = Brush.verticalGradient(
                    colors = if (isFocused) listOf(colorTop.copy(alpha = 0.8f), Color.Black) 
                             else listOf(Color(0xFF1A1A1A), Color(0xFF1A1A1A))
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        // 배경 발광 효과 (Panel Accent Color 기반)
        if (isFocused) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.radialGradient(
                            center = androidx.compose.ui.geometry.Offset(500f, 1500f), // Bottom side
                            radius = 1200f,
                            colors = listOf(Color(profile.panelAccentColor).copy(alpha = 0.3f), Color.Transparent)
                        )
                    )
            )
        }

        Column(
            modifier = Modifier.padding(top = 100.dp, bottom = 40.dp), // 상단 패딩 완화하여 컨텐츠 영역 확보
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // 아바타 - Web 실데이터 연동 URL
            ProfileAvatar(
                profile = profile,
                onClick = {}, 
                modifier = Modifier.size(if (isFocused) 130.dp else 85.dp)
            )

            // 상세 정보 (포커스 시 노출)
            AnimatedVisibility(
                visible = isFocused,
                enter = fadeIn() + expandVertically(),
                exit = fadeOut() + shrinkVertically()
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(top = 18.dp).fillMaxWidth() // 패딩 축소
                ) {
                    Text(
                        text = profile.name,
                        style = MaterialTheme.typography.displaySmall,
                        color = Color.White,
                        fontWeight = FontWeight.ExtraBold
                    )
                    
                    Spacer(modifier = Modifier.height(14.dp)) // 간격 축소
                    
                    // 선호 앱 아이콘 세트 (Web 디자인 반영)
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        listOf(
                            Triple("N", Color(0xFFE50914), "Netflix"),
                            Triple("T", Color(0xFFFF153C), "TVING"),
                            Triple("D", Color(0xFF0063E5), "Disney+"),
                            Triple("Y", Color(0xFFFF0000), "YouTube")
                        ).forEach { (label, color, name) ->
                            Box(
                                modifier = Modifier
                                    .size(28.dp)
                                    .background(color, shape = androidx.compose.foundation.shape.RoundedCornerShape(6.dp)),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(text = label, color = Color.White, fontSize = 10.sp, fontWeight = FontWeight.Black)
                            }
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(30.dp)) // 간격 축소 (40 -> 30)
                    
                    // 이어보기 콘텐츠 목업 카드 (2개 가로 배치)
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(16.dp),
                        modifier = Modifier.padding(horizontal = 32.dp)
                    ) {
                        repeat(2) { index ->
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .height(110.dp) // 카드 높이 미세 조정 (130 -> 110)
                                    .background(Color.White.copy(alpha = 0.08f), shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp))
                                    .border(1.dp, Color.White.copy(alpha = 0.1f), shape = androidx.compose.foundation.shape.RoundedCornerShape(12.dp)),
                                contentAlignment = Alignment.BottomStart
                            ) {
                                Column(modifier = Modifier.padding(12.dp)) {
                                    Text(text = if (index == 0) "오징어 게임" else "더 글로리", color = Color.White, style = MaterialTheme.typography.labelLarge)
                                    Spacer(modifier = Modifier.height(4.dp))
                                    // Progress bar
                                    Box(modifier = Modifier.fillMaxWidth().height(4.dp).background(Color.DarkGray)) {
                                        Box(modifier = Modifier.fillMaxWidth(if (index == 0) 0.7f else 0.45f).fillMaxHeight().background(colorBottom))
                                    }
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))
                    
                    Text(
                        text = "↓ 상세 대시보드 확인",
                        style = MaterialTheme.typography.labelSmall,
                        color = colorBottom.copy(alpha = 0.6f),
                        fontSize = 9.sp
                    )
                }
            }
        }

        // 비포커스 시 어두운 오버레이
        if (!isFocused) {
            Box(modifier = Modifier.fillMaxSize().background(Color.Black.copy(alpha = 0.5f)))
        }
    }
}
