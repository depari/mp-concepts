package com.depari.mpconcepts

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.tv.material3.ExperimentalTvMaterial3Api
import androidx.tv.material3.MaterialTheme
import androidx.tv.material3.Surface
import androidx.compose.material3.Text
import com.depari.mpconcepts.components.PlayerScreen
import com.depari.mpconcepts.components.ProfileAvatar
import com.depari.mpconcepts.components.RecommendedRow
import com.depari.mpconcepts.data.Content

enum class AppMode {
    PROFILE_SELECTION,
    HOME,
    PLAYER
}

@OptIn(ExperimentalTvMaterial3Api::class)
class MainActivity : ComponentActivity() {
    private val profileViewModel = ProfileViewModel()
    private val homeViewModel = HomeViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Mock data setup
        profileViewModel.setProfiles(listOf(
            Profile("1", "User Alpha"),
            Profile("2", "User Beta")
        ))

        homeViewModel.setSectionContents("Recommended", listOf(
            Content("c1", "Top Movie 1", "Action"),
            Content("c2", "Top Movie 2", "Comedy"),
            Content("c3", "Top Movie 3", "Drama"),
            Content("c4", "Top Movie 4", "Sci-Fi")
        ))
        
        homeViewModel.setSectionContents("Latest News", listOf(
            Content("n1", "TV Tech News", "Hardware"),
            Content("n2", "App Update", "Software")
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

    // D-Pad Back key handling for TV
    BackHandler(enabled = currentMode != AppMode.PROFILE_SELECTION) {
        when (currentMode) {
            AppMode.PLAYER -> currentMode = AppMode.HOME
            AppMode.HOME -> currentMode = AppMode.PROFILE_SELECTION
            else -> {}
        }
    }

    MaterialTheme {
        Surface(
            modifier = Modifier.fillMaxSize()
        ) {
            when (currentMode) {
                AppMode.PROFILE_SELECTION -> {
                    ProfileSelectionScreen(profileViewModel) {
                        currentMode = AppMode.HOME
                    }
                }
                AppMode.HOME -> {
                    HomeScreen(homeViewModel, profileViewModel) { content ->
                        // Sample video for POC
                        selectedVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        currentMode = AppMode.PLAYER
                    }
                }
                AppMode.PLAYER -> {
                    PlayerScreen(
                        videoUrl = selectedVideoUrl,
                        onBack = { currentMode = AppMode.HOME }
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun ProfileSelectionScreen(viewModel: ProfileViewModel, onProfileSelect: () -> Unit) {
    val profiles by viewModel.profiles.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Choose Your Profile",
            style = MaterialTheme.typography.displayMedium,
            color = Color.White,
            modifier = Modifier.padding(bottom = 48.dp)
        )

        Row(
            horizontalArrangement = Arrangement.spacedBy(32.dp)
        ) {
            profiles.forEach { profile ->
                ProfileAvatar(
                    profile = profile,
                    onClick = { 
                        viewModel.selectProfile(profile.id)
                        onProfileSelect()
                    }
                )
            }
        }
    }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun HomeScreen(
    homeViewModel: HomeViewModel, 
    profileViewModel: ProfileViewModel, 
    onContentSelect: (Content) -> Unit
) {
    val selectedProfile by profileViewModel.selectedProfile.collectAsState()
    val recommendedContents by homeViewModel.getContentsForSection("Recommended").collectAsState()
    val newsContents by homeViewModel.getContentsForSection("Latest News").collectAsState()

    Column(
        modifier = Modifier.fillMaxSize().padding(48.dp),
        verticalArrangement = Arrangement.spacedBy(32.dp)
    ) {
        Row(
            modifier = Modifier.padding(bottom = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Hello, ${selectedProfile?.name ?: "Guest"}!",
                style = MaterialTheme.typography.headlineLarge,
                color = Color.Cyan
            )
        }

        RecommendedRow(
            title = "Recommended for You",
            contents = recommendedContents,
            onContentClick = { onContentSelect(it) }
        )

        RecommendedRow(
            title = "Latest News",
            contents = newsContents,
            onContentClick = { onContentSelect(it) }
        )
        
        Text(
            text = "Press Back key on Remote to Switch Profile",
            color = Color.DarkGray,
            style = MaterialTheme.typography.labelSmall
        )
    }
}
