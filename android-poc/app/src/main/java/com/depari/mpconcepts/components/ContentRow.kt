package com.depari.mpconcepts.components

import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.foundation.lazy.list.TvLazyRow
import androidx.tv.foundation.lazy.list.items
import androidx.tv.material3.*
import com.depari.mpconcepts.data.Content

/**
 * 홈 화면의 수평 콘텐츠 섹션을 나타내는 범용 Row 컴포넌트.
 * 타이틀 레이아웃 및 카드 간의 간격을 정밀하게 조정하여 웹 프로토타입의 미학을 유지합니다.
 */
@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun ContentRow(
    title: String,
    contents: List<Content>,
    onContentClick: (Content) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp)
    ) {
        // 섹션 타이틀 (웹 스타일: 볼드, 적절한 여백)
        Text(
            text = title,
            style = MaterialTheme.typography.headlineSmall.copy(
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,
                letterSpacing = 0.5.sp
            ),
            color = Color.White.copy(alpha = 0.9f),
            modifier = Modifier.padding(start = 58.dp, bottom = 12.dp) // 화면 시작 여백에 맞춤
        )
        
        TvLazyRow(
            contentPadding = PaddingValues(horizontal = 58.dp),
            horizontalArrangement = Arrangement.spacedBy(20.dp) // 카드 간 여백 확대
        ) {
            items(items = contents) { content ->
                RecommendedCard(
                    content = content,
                    onClick = { onContentClick(content) }
                )
            }
        }
    }
}
