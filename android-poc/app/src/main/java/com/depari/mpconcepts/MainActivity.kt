package com.depari.mpconcepts

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.runtime.collectAsState
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
import com.depari.mpconcepts.components.*
import com.depari.mpconcepts.data.Content
import com.depari.mpconcepts.viewmodel.ProfileViewModel
import com.depari.mpconcepts.viewmodel.HomeViewModel

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

        homeViewModel.loadContentsForProfile("p1") // 초기 데이터 로드

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

    // 럭셔리 다크 테마 강제 (시스템 설정 무시)
    val darkColors = androidx.tv.material3.darkColorScheme(
        primary = Color.White,
        background = Color.Black,
        surface = Color.Black,
        onBackground = Color.White,
        onSurface = Color.White
    )

    androidx.tv.material3.MaterialTheme(colorScheme = darkColors) {
        Surface(
            modifier = Modifier.fillMaxSize().background(Color.Black)
        ) {
            AnimatedContent(
                targetState = currentMode,
                transitionSpec = {
                    fadeIn(animationSpec = tween(500)) togetherWith fadeOut(animationSpec = tween(500))
                },
                label = "ScreenTransition"
            ) { targetMode ->
                when (targetMode) {
                    AppMode.PROFILE_SELECTION -> {
                        ProfileSelectionScreen(profileViewModel, homeViewModel) {
                            currentMode = AppMode.HOME
                        }
                    }
                    AppMode.HOME -> {
                        HomeScreen(homeViewModel, profileViewModel) { content ->
                            homeViewModel.selectContent(content)
                            currentMode = AppMode.DETAILS
                        }
                    }
                    AppMode.DETAILS -> {
                        val selectedContent by homeViewModel.selectedContent.collectAsState(initial = null)
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
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun ProfileSelectionScreen(
    viewModel: ProfileViewModel,
    homeViewModel: HomeViewModel,
    onProfileSelect: () -> Unit
) {
    val profiles: List<com.depari.mpconcepts.Profile> by viewModel.profiles.collectAsState(initial = emptyList())
    var focusedProfileId by remember { mutableStateOf<String?>(null) }
    
    // 웹 프로젝트 스타일: 콘텐츠 브라우징 모드 상태
    var isContentBrowsing by remember { mutableStateOf(false) }
    
    // 상단 프로필 리스트 수직 이동 애니메이션
    val profileListVerticalOffset by androidx.compose.animation.core.animateDpAsState(
        targetValue = if (isContentBrowsing) (-120).dp else 0.dp,
        animationSpec = tween(600),
        label = "ProfileListOffset"
    )

    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp
    val density = LocalDensity.current
    val focusedIndex = if (profiles.isEmpty()) 0 else profiles.indexOfFirst { it.id == focusedProfileId }.coerceAtLeast(0)
    
    val itemSpacing = 40.dp
    val normalWidth = 120.dp
    val expandedWidth = 450.dp
    
    val targetOffsetPx = with(density) {
        if (profiles.isEmpty()) return@with 0f
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
    val browserFocusRequester = remember { FocusRequester() }

    LaunchedEffect(profiles, focusRequesters) {
        if (profiles.isNotEmpty() && focusRequesters.size == profiles.size && !isContentBrowsing) {
            focusRequesters[focusedIndex].requestFocus()
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black)
            .onKeyEvent { keyEvent ->
                if (keyEvent.type == KeyEventType.KeyDown) {
                    when (keyEvent.key) {
                        Key.DirectionDown -> {
                            if (!isContentBrowsing) {
                                isContentBrowsing = true
                                true
                            } else false
                        }
                        Key.DirectionUp -> {
                            if (isContentBrowsing) {
                                isContentBrowsing = false
                                focusRequesters[focusedIndex].requestFocus()
                                true
                            } else false
                        }
                        Key.One, Key.Two, Key.Three, Key.Four, Key.Five -> {
                            val count = when(keyEvent.key) {
                                Key.One -> 1; Key.Two -> 3; Key.Three -> 5; Key.Four -> 7; else -> 10
                            }
                            val nicknames = listOf("지은", "민준", "하나", "서윤", "도윤", "하윤", "시우")
                            val avatars = listOf(R.drawable.avatar_1, R.drawable.avatar_2, R.drawable.avatar_3, R.drawable.avatar_4, R.drawable.avatar_5, R.drawable.avatar_6, R.drawable.avatar_7)
                            val palette = listOf(0xFFF8BBD0 to 0xFFF06292, 0xFFBBDEFB to 0xFF42A5F5, 0xFFDCEDC8 to 0xFF8BC34A, 0xFFFFF9C4 to 0xFFFBC02D, 0xFFD1C4E9 to 0xFF7E57C2, 0xFFFFE0B2 to 0xFFFB8C00, 0xFFB2EBF2 to 0xFF00ACC1)
                            val testProfiles = (1..count).map { i ->
                                val idx = (i - 1) % 7
                                Profile("test_$i", if (i <= 7) nicknames[idx] else "User $i", palette[idx].first, palette[idx].second, null, avatars[idx], palette[idx].second)
                            }
                            viewModel.setProfiles(testProfiles)
                            true
                        }
                        else -> false
                    }
                } else false
            }
    ) {
        // [배경/중앙] 프로필 카드 목록
        Box(
            modifier = Modifier
                .fillMaxSize()
                .offset(y = profileListVerticalOffset),
            contentAlignment = Alignment.CenterStart
        ) {
            Row(
                modifier = Modifier
                    .layout { measurable, constraints ->
                        val placeable = measurable.measure(constraints.copy(maxWidth = Constraints.Infinity))
                        layout(constraints.maxWidth, constraints.maxHeight) {
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
                        isFocused = focusedProfileId == profile.id && !isContentBrowsing,
                        onFocusChange = { 
                            if (it && !isContentBrowsing) focusedProfileId = profile.id 
                        },
                        onClick = {
                            viewModel.selectProfile(profile.id)
                            onProfileSelect()
                        },
                        modifier = Modifier.focusRequester(focusRequesters[index])
                    )
                }
            }
        }

        // [하단] 콘텐츠 브라우저 (DirectionDown으로 진입)
        androidx.compose.animation.AnimatedVisibility(
            visible = isContentBrowsing,
            enter = androidx.compose.animation.slideInVertically(initialOffsetY = { it / 2 }) + androidx.compose.animation.fadeIn(),
            exit = androidx.compose.animation.slideOutVertically(targetOffsetY = { it / 2 }) + androidx.compose.animation.fadeOut(),
            modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 80.dp)
        ) {
            val previewContents by homeViewModel.getContentsForSection("Recommended").collectAsState(initial = emptyList())
            Column {
                ContentRow(
                    title = "Quick Browse: ${profiles.find { it.id == focusedProfileId }?.name ?: ""}",
                    contents = previewContents,
                    onContentClick = {
                        viewModel.selectProfile(focusedProfileId ?: "")
                        homeViewModel.selectContent(it)
                        onProfileSelect() 
                    },
                    modifier = Modifier.focusRequester(browserFocusRequester)
                )
                LaunchedEffect(Unit) { browserFocusRequester.requestFocus() }
            }
        }

        // [상단] 타이틀 영역 (브라우징 시 공간을 위해 자동 이동 필요 없음)
        Column(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 25.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Choose Your Experience",
                style = MaterialTheme.typography.headlineSmall,
                color = Color.White.copy(alpha = 0.9f)
            )
            Spacer(modifier = Modifier.height(4.dp))
            Box(modifier = Modifier.width(40.dp).height(1.dp).background(Color.White.copy(alpha = 0.2f)))
        }

        // [하단] 조작 가이드
        if (!isContentBrowsing) {
            Column(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    Text(text = "← → MOVE", color = Color.Gray.copy(alpha = 0.6f), style = MaterialTheme.typography.labelSmall, fontSize = 9.sp)
                    Text(text = "↓ BROWSE", color = Color.Cyan.copy(alpha = 0.8f), style = MaterialTheme.typography.labelSmall, fontSize = 9.sp)
                }
            }
        }
        }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun HomeScreen(homeViewModel: HomeViewModel, profileViewModel: ProfileViewModel, onContentSelect: (Content) -> Unit) {
    val selectedProfile by profileViewModel.selectedProfile.collectAsState()
    val recommendedContents by homeViewModel.getContentsForSection("Recommended").collectAsState(initial = emptyList())
    val trendingContents by homeViewModel.getContentsForSection("Trending Now").collectAsState(initial = emptyList())
    
    // 포커싱 된 콘텐츠 (히어로 배너용) - 데모용으로 첫 번째 아이템 선정
    val heroContent = recommendedContents.firstOrNull()

    androidx.compose.foundation.lazy.LazyColumn(
        modifier = Modifier.fillMaxSize().background(Color.Black),
        verticalArrangement = Arrangement.Top
    ) {
        // 상단 히어로 배너 섹션 (영화 홍보 이미지 포함)
        item {
            HeroSection(heroContent)
            Spacer(modifier = Modifier.height(24.dp))
        }

        // 수평 콘텐츠 Row 모음
        item {
            ContentRow(
                title = "Curated for ${selectedProfile?.name ?: "You"}",
                contents = recommendedContents,
                onContentClick = onContentSelect
            )
        }

        item {
            ContentRow(
                title = "Trending Now",
                contents = trendingContents,
                onContentClick = onContentSelect
            )
        }

        item {
            // 하단 여백 확보
            Spacer(modifier = Modifier.height(64.dp))
        }
    }
}
