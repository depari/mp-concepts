package com.depari.mpconcepts

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.depari.mpconcepts.components.ProfileAvatar

class MainActivity : ComponentActivity() {
    private val viewModel = ProfileViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initial setup
        viewModel.setProfiles(listOf(
            Profile("1", "User Alpha"),
            Profile("2", "User Beta"),
            Profile("3", "User Gamma")
        ))

        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color.Black // TV style dark background
                ) {
                    ProfileSelectionScreen(viewModel)
                }
            }
        }
    }
}

@Composable
fun ProfileSelectionScreen(viewModel: ProfileViewModel) {
    val profiles by viewModel.profiles.collectAsState()
    val selectedProfile by viewModel.selectedProfile.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Welcome, Choose Your Profile",
            style = MaterialTheme.typography.headlineLarge,
            color = Color.White,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        Row(
            horizontalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            profiles.forEach { profile ->
                ProfileAvatar(
                    profile = profile,
                    onClick = { viewModel.selectProfile(profile.id) }
                )
            }
        }

        selectedProfile?.let {
            Text(
                text = "Selected: ${it.name}",
                color = Color.Cyan,
                modifier = Modifier.padding(top = 40.dp)
            )
        }
    }
}
