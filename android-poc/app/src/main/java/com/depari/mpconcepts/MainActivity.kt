package com.depari.mpconcepts

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.layout.layout
import androidx.compose.ui.unit.Constraints
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.input.key.*
import androidx.tv.material3.ExperimentalTvMaterial3Api
import androidx.tv.material3.MaterialTheme
import androidx.tv.material3.Surface
import com.depari.mpconcepts.R
import com.depari.mpconcepts.components.PlayerScreen
import com.depari.mpconcepts.components.ProfilePanel
import com.depari.mpconcepts.components.RecommendedRow
import com.depari.mpconcepts.data.Content

enum class AppMode {
    PROFILE_SELECTION,
    HOME,
    DETAILS,
    PLAYER
}

@OptIn(ExperimentalTvMaterial3Api::class)
class MainActivity : ComponentActivity() {
    private val profileViewModel = ProfileViewModel()
    private val homeViewModel = HomeViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        profileViewModel.setProfiles(listOf(
            Profile("p1", "지은", 0xFFF8BBD0, 0xFFF06292, null, R.drawable.avatar_1, 0xFFF06292),
            Profile("p2", "민준", 0xFFBBDEFB, 0xFF42A5F5, null, R.drawable.avatar_2, 0xFF42A5F5),
            Profile("p3", "하나", 0xFFDCEDC8, 0xFF8BC34A, null, R.drawable.avatar_3, 0xFF8BC34A)
        ))

        homeViewModel.setSectionContents("Recommended", listOf(
            Content("c1", "Top Movie 1", "2026 Release", "Action"),
            Content("c2", "Top Movie 2", "New Arrival", "Comedy")
        ))

        setContent {
            AppContent(profileViewModel, homeViewModel)
        }
    }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun AppContent(profileViewModel: ProfileViewModel, homeViewModel: HomeViewModel) {
    var currentMode by remember { mutableStateOf(AppMode.PROFILE_SELECTION) }
    var selectedVideoUrl by remember { mutableStateOf("") }

    BackHandler(enabled = currentMode != AppMode.PROFILE_SELECTION) {
        when (currentMode) {
            AppMode.PLAYER -> currentMode = AppMode.DETAILS
            AppMode.DETAILS -> currentMode = AppMode.HOME
            AppMode.HOME -> currentMode = AppMode.PROFILE_SELECTION
            else -> {}
        }
    }

    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize()) {
            when (currentMode) {
                AppMode.PROFILE_SELECTION -> {
                    ProfileSelectionScreen(profileViewModel) {
                        currentMode = AppMode.HOME
                    }
                }
                AppMode.HOME -> {
                    HomeScreen(homeViewModel, profileViewModel) { content ->
                        homeViewModel.selectContent(content.id)
                        currentMode = AppMode.DETAILS
                    }
                }
                AppMode.DETAILS -> {
                    val selectedContent by homeViewModel.selectedContent.collectAsState()
                    selectedContent?.let {
                        com.depari.mpconcepts.screens.DetailsScreen(
                            content = it,
                            onPlayClick = {
                                selectedVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                currentMode = AppMode.PLAYER
                            },
                            onBackClick = { currentMode = AppMode.HOME }
                        )
                    }
                }
                AppMode.PLAYER -> {
                    PlayerScreen(videoUrl = selectedVideoUrl, onBack = { currentMode = AppMode.DETAILS })
                }
            }
        }
    }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun ProfileSelectionScreen(viewModel: ProfileViewModel, onProfileSelect: () -> Unit) {
    val profiles by viewModel.profiles.collectAsState()
    var focusedProfileId by remember { mutableStateOf<String?>(null) }
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp
    val density = LocalDensity.current

    val focusedIndex = profiles.indexOfFirst { it.id == focusedProfileId }.coerceAtLeast(0)
    
    // 레이아웃 상수 (Web Project Parity 복구)
    val itemSpacing = 40.dp
    val normalWidth = 120.dp
    val expandedWidth = 450.dp
    
    // 정밀 픽셀 기반 오프셋 계산 (누적 오차 방지)
    val targetOffsetPx = with(density) {
        val screenWidthPx = screenWidth.toPx()
        val expandedWidthPx = expandedWidth.toPx()
        val normalWidthPx = normalWidth.toPx()
        val itemSpacingPx = itemSpacing.toPx()
        
        (screenWidthPx / 2) - (expandedWidthPx / 2) - ((normalWidthPx + itemSpacingPx) * focusedIndex)
    }
    
    val animatedOffsetPx by androidx.compose.animation.core.animateFloatAsState(
        targetValue = targetOffsetPx,
        animationSpec = tween(durationMillis = 500),
        label = "CentralOffsetPx"
    )

    val focusRequesters = remember(profiles.size) { profiles.map { FocusRequester() } }

    LaunchedEffect(profiles) {
        if (profiles.isNotEmpty()) {
            focusRequesters[0].requestFocus()
            focusedProfileId = profiles[0].id
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .onKeyEvent { keyEvent ->
                if (keyEvent.type == KeyEventType.KeyDown) {
                    val newCount = when (keyEvent.key) {
                        Key.One -> 1
                        Key.Two -> 3
                        Key.Three -> 5
                        Key.Four -> 7
                        Key.Five -> 10
                        else -> -1
                    }
                    if (newCount != -1) {
                        val nicknames = listOf("지은", "민준", "하나", "서윤", "도윤", "하윤", "시우")
                        val avatars = listOf(R.drawable.avatar_1, R.drawable.avatar_2, R.drawable.avatar_3, R.drawable.avatar_4, R.drawable.avatar_5, R.drawable.avatar_6, R.drawable.avatar_7)
                        val palette = listOf(0xFFF8BBD0 to 0xFFF06292, 0xFFBBDEFB to 0xFF42A5F5, 0xFFDCEDC8 to 0xFF8BC34A, 0xFFFFF9C4 to 0xFFFBC02D, 0xFFD1C4E9 to 0xFF7E57C2, 0xFFFFE0B2 to 0xFFFB8C00, 0xFFB2EBF2 to 0xFF00ACC1)

                        val testProfiles = (1..newCount).map { i ->
                            val idx = (i - 1) % 7
                            Profile("test_$i", if (i <= 7) nicknames[idx] else "User $i", palette[idx].first, palette[idx].second, null, avatars[idx], palette[idx].second)
                        }
                        viewModel.setProfiles(testProfiles)
                        true
                    } else false
                } else false
            }
    ) {
        // [배경/중앙] 프로필 카드 목록 (레이아웃 단계에서 수동 배치로 정밀 정렬)
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.CenterStart // 수직 중앙 정렬 유지, 가로는 수동 오프셋 적용
        ) {
            Row(
                modifier = Modifier
                    .layout { measurable, constraints ->
                        // 가로 너비 제약을 무한대로 풀어 4개 이상의 아이템도 잘림 없이 렌더링
                        val placeable = measurable.measure(constraints.copy(maxWidth = Constraints.Infinity))
                        // 레이아웃 자체의 사이즈는 화면 전체로 보고하여 부모의 제약과 충돌 방지
                        layout(constraints.maxWidth, constraints.maxHeight) {
                            // 픽셀 기반 애니메이션 오프셋 직접 적용 (PlacementScope 내에서 호출)
                            placeable.placeRelative(animatedOffsetPx.toInt(), 0)
                        }
                    }
                    .wrapContentWidth(unbounded = true),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(itemSpacing)
            ) {
                profiles.forEachIndexed { index, profile ->
                    ProfilePanel(
                        profile = profile,
                        isFocused = focusedProfileId == profile.id,
                        onFocusChange = { if (it) focusedProfileId = profile.id },
                        onClick = {
                            viewModel.selectProfile(profile.id)
                            onProfileSelect()
                        },
                        modifier = Modifier.focusRequester(focusRequesters[index])
                    )
                }
            }
        }

        // [상단] 타이틀 영역 (슬림화 및 최상단 배치)
        Column(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 25.dp), // 최상단 배치
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Choose Your Experience",
                style = MaterialTheme.typography.headlineSmall.copy(letterSpacing = 1.sp), // 더 슬림한 폰트
                color = Color.White.copy(alpha = 0.9f),
                fontWeight = FontWeight.Light,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(8.dp))
            Box(modifier = Modifier.width(40.dp).height(1.dp).background(Color.White.copy(alpha = 0.2f)))
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = "Select a profile to access your personalized content",
                style = MaterialTheme.typography.labelSmall,
                color = Color.White.copy(alpha = 0.3f),
                textAlign = TextAlign.Center,
                fontSize = 11.sp
            )
        }

        // [하단] 조작 가이드 영역 (최하단 배치)
        Column(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 20.dp), // 최하단 배치
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                Text(text = "← → MOVE", color = Color.Gray.copy(alpha = 0.6f), style = MaterialTheme.typography.labelSmall, fontSize = 9.sp)
                Text(text = "•", color = Color.DarkGray.copy(alpha = 0.4f))
                Text(text = "ENTER SELECT", color = Color.Gray.copy(alpha = 0.6f), style = MaterialTheme.typography.labelSmall, fontSize = 9.sp)
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "TEST: Press 1~5 to Change Profile Count",
                color = Color.DarkGray.copy(alpha = 0.2f),
                style = MaterialTheme.typography.labelSmall,
                fontSize = 8.sp,
                textAlign = TextAlign.Center
            )
        }
    }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun HomeScreen(homeViewModel: HomeViewModel, profileViewModel: ProfileViewModel, onContentSelect: (Content) -> Unit) {
    val selectedProfile by profileViewModel.selectedProfile.collectAsState()
    val recommendedContents by homeViewModel.getContentsForSection("Recommended").collectAsState()
    Column(modifier = Modifier.fillMaxSize().padding(48.dp)) {
        Text("Hello, ${selectedProfile?.name ?: "Guest"}!", style = MaterialTheme.typography.headlineLarge, color = Color.Cyan)
        Spacer(modifier = Modifier.height(32.dp))
        RecommendedRow("Recommended for You", recommendedContents, { onContentSelect(it) })
    }
}
