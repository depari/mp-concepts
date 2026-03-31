package com.depari.mpconcepts.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.tv.foundation.lazy.list.TvLazyRow
import androidx.tv.foundation.lazy.list.items
import androidx.compose.material3.Text
import com.depari.mpconcepts.data.Content

@Composable
fun RecommendedRow(
    title: String,
    contents: List<Content>,
    onContentClick: (Content) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        Text(
            text = title,
            color = Color.White,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        TvLazyRow(
            horizontalArrangement = Arrangement.spacedBy(16.dp)
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
