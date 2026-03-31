package com.depari.mpconcepts.provider

import android.content.ContentProvider
import android.content.ContentValues
import android.database.Cursor
import android.net.Uri

/**
 * Google TV Home 통합을 위한 기초 Recommendation ContentProvider.
 * 향후 TV 홈 화면의 채널 및 프로그램 API와 통신하여 추천 콘텐츠를 제공한다.
 */
class RecommendationProvider : ContentProvider() {

    override fun onCreate(): Boolean {
        return true
    }

    override fun query(
        uri: Uri,
        projection: Array<out String>?,
        selection: String?,
        selectionArgs: Array<out String>?,
        sortOrder: String?
    ): Cursor? {
        // TODO: TV 홈 화면 시스템으로부터의 쿼리 요청 처리 로직 구현 (Phase 4)
        return null
    }

    override fun getType(uri: Uri): String? {
        return "vnd.android.cursor.dir/com.depari.mpconcepts.recommendation"
    }

    override fun insert(uri: Uri, values: ContentValues?): Uri? {
        return null
    }

    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<out String>?): Int {
        return 0
    }

    override fun update(
        uri: Uri,
        values: ContentValues?,
        selection: String?,
        selectionArgs: Array<out String>?
    ): Int {
        return 0
    }
}
