package com.depari.mpconcepts.screens

import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.tv.material3.*
import coil.compose.AsyncImage
import com.depari.mpconcepts.data.Content

/**
 * 콘텐츠 상세 정보를 보여주는 스크린.
 * TV 최적화된 배경 이미지 전면 배치 및 주요 정보(제목, 설명) 제공.
 */
@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun DetailsScreen(
    content: Content,
    onPlayClick: () -> Unit,
    onBackClick: () -> Unit
) {
    val playButtonFocusRequester = remember { FocusRequester() }

    LaunchedEffect(Unit) {
        playButtonFocusRequester.requestFocus()
    }

    Box(modifier = Modifier.fillMaxSize()) {
        // 배경 이미지 (큰 화면) - 샘플 URL (BigBuckBunny 배경)
        AsyncImage(
            model = "https://peach.blender.org/wp-content/uploads/title_anidown.jpg",
            contentDescription = null,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop,
            alpha = 0.4f // 배경 흐리게
        )

        // 콘텐츠 정보 및 액션 버튼
        Column(
            modifier = Modifier
                .fillMaxHeight()
                .padding(start = 58.dp, top = 80.dp)
                .width(550.dp),
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = content.title,
                style = MaterialTheme.typography.displayMedium,
                color = Color.White
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "${content.genre} • 2026 • Premium Content",
                style = MaterialTheme.typography.bodyLarge,
                color = Color.Cyan
            )
            Spacer(modifier = Modifier.height(24.dp))
            Text(
                text = "Google TV 전용 프리미엄 콘텐츠 서비스 MP Concept의 데모 영상입니다. 몰입감 있는 시네마틱 경험과 직관적인 네비게이션을 체험해보세요.",
                style = MaterialTheme.typography.bodyMedium,
                color = Color.White.copy(alpha = 0.8f)
            )
            Spacer(modifier = Modifier.height(48.dp))

            // 재생 버튼
            Button(
                onClick = onPlayClick,
                modifier = Modifier
                    .focusRequester(playButtonFocusRequester)
                    .width(200.dp)
            ) {
                Text(text = "재생하기")
            }
        }
    }
}
