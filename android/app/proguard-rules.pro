# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Firebase
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Notifee
-keep class io.invertase.notifee.** { *; }
-dontwarn io.invertase.notifee.**

# Prevent stripping of metadata needed for dynamic features
-keepattributes *Annotation*, Signature

# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.modules.** { *; }
-dontwarn com.facebook.react.**

# Hermes
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**
