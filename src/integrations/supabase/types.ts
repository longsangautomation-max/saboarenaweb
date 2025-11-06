export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_color: string | null
          category: string | null
          created_at: string | null
          description: string
          icon_url: string | null
          id: string
          name: string
          points_required: number | null
          tournaments_required: number | null
          updated_at: string | null
          wins_required: number | null
        }
        Insert: {
          badge_color?: string | null
          category?: string | null
          created_at?: string | null
          description: string
          icon_url?: string | null
          id?: string
          name: string
          points_required?: number | null
          tournaments_required?: number | null
          updated_at?: string | null
          wins_required?: number | null
        }
        Update: {
          badge_color?: string | null
          category?: string | null
          created_at?: string | null
          description?: string
          icon_url?: string | null
          id?: string
          name?: string
          points_required?: number | null
          tournaments_required?: number | null
          updated_at?: string | null
          wins_required?: number | null
        }
        Relationships: []
      }
      admin_activity_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_guide_progress: {
        Row: {
          completed_at: string | null
          current_step: number | null
          guide_id: string
          id: string
          is_completed: boolean | null
          last_accessed_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          current_step?: number | null
          guide_id: string
          id?: string
          is_completed?: boolean | null
          last_accessed_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          current_step?: number | null
          guide_id?: string
          id?: string
          is_completed?: boolean | null
          last_accessed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_guide_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_guide_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_guide_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_guides: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string
          estimated_minutes: number | null
          id: string
          is_new: boolean | null
          last_updated: string | null
          priority: number | null
          steps: Json
          tags: string[] | null
          title: string
          version: string
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description: string
          estimated_minutes?: number | null
          id: string
          is_new?: boolean | null
          last_updated?: string | null
          priority?: number | null
          steps?: Json
          tags?: string[] | null
          title: string
          version: string
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          estimated_minutes?: number | null
          id?: string
          is_new?: boolean | null
          last_updated?: string | null
          priority?: number | null
          steps?: Json
          tags?: string[] | null
          title?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_guides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_guides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_guides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          target_id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_admin_logs_admin_id"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_admin_logs_admin_id"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_admin_logs_admin_id"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_quick_help: {
        Row: {
          created_at: string | null
          description: string
          element_id: string
          id: string
          is_active: boolean | null
          priority: number | null
          related_guide_id: string | null
          screen_id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          element_id: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          related_guide_id?: string | null
          screen_id: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          element_id?: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          related_guide_id?: string | null
          screen_id?: string
          title?: string
        }
        Relationships: []
      }
      announcement_reads: {
        Row: {
          announcement_id: string | null
          id: string
          read_at: string | null
          user_id: string | null
        }
        Insert: {
          announcement_id?: string | null
          id?: string
          read_at?: string | null
          user_id?: string | null
        }
        Update: {
          announcement_id?: string | null
          id?: string
          read_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcement_reads_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "announcements"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          attachments: Json | null
          club_id: string | null
          content: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_pinned: boolean | null
          priority: string | null
          target_roles: string[] | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          club_id?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_pinned?: boolean | null
          priority?: string | null
          target_roles?: string[] | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          club_id?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_pinned?: boolean | null
          priority?: string | null
          target_roles?: string[] | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "announcements_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcements_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      attendance_notifications: {
        Row: {
          club_id: string
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          notification_type: string
          read_at: string | null
          recipient_id: string
          sent_at: string | null
          staff_id: string | null
          title: string
        }
        Insert: {
          club_id: string
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          notification_type: string
          read_at?: string | null
          recipient_id: string
          sent_at?: string | null
          staff_id?: string | null
          title: string
        }
        Update: {
          club_id?: string
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          notification_type?: string
          read_at?: string | null
          recipient_id?: string
          sent_at?: string | null
          staff_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "attendance_notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "attendance_notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "attendance_notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_notifications_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_configurations: {
        Row: {
          bet_amount: number
          created_at: string | null
          description: string
          description_vi: string
          id: string
          is_active: boolean | null
          race_to: number
          updated_at: string | null
        }
        Insert: {
          bet_amount: number
          created_at?: string | null
          description: string
          description_vi: string
          id?: string
          is_active?: boolean | null
          race_to: number
          updated_at?: string | null
        }
        Update: {
          bet_amount?: number
          created_at?: string | null
          description?: string
          description_vi?: string
          id?: string
          is_active?: boolean | null
          race_to?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      challenges: {
        Row: {
          challenge_config_id: string | null
          challenge_type: string
          challenged_id: string | null
          challenger_id: string | null
          club_id: string | null
          created_at: string | null
          duration_minutes: number | null
          end_time: string | null
          expires_at: string | null
          handicap_challenged: number | null
          handicap_challenger: number | null
          id: string
          is_live: boolean | null
          match_conditions: Json | null
          match_id: string | null
          message: string | null
          player1_score: number | null
          player2_score: number | null
          race_to: number | null
          rank_difference: number | null
          responded_at: string | null
          response_message: string | null
          stakes_amount: number | null
          stakes_type: string | null
          start_time: string | null
          status: string | null
          updated_at: string | null
          video_urls: string[] | null
          winner_id: string | null
        }
        Insert: {
          challenge_config_id?: string | null
          challenge_type?: string
          challenged_id?: string | null
          challenger_id?: string | null
          club_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          expires_at?: string | null
          handicap_challenged?: number | null
          handicap_challenger?: number | null
          id?: string
          is_live?: boolean | null
          match_conditions?: Json | null
          match_id?: string | null
          message?: string | null
          player1_score?: number | null
          player2_score?: number | null
          race_to?: number | null
          rank_difference?: number | null
          responded_at?: string | null
          response_message?: string | null
          stakes_amount?: number | null
          stakes_type?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
          video_urls?: string[] | null
          winner_id?: string | null
        }
        Update: {
          challenge_config_id?: string | null
          challenge_type?: string
          challenged_id?: string | null
          challenger_id?: string | null
          club_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          expires_at?: string | null
          handicap_challenged?: number | null
          handicap_challenger?: number | null
          id?: string
          is_live?: boolean | null
          match_conditions?: Json | null
          match_id?: string | null
          message?: string | null
          player1_score?: number | null
          player2_score?: number | null
          race_to?: number | null
          rank_difference?: number | null
          responded_at?: string | null
          response_message?: string | null
          stakes_amount?: number | null
          stakes_type?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
          video_urls?: string[] | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenges_challenge_config_id_fkey"
            columns: ["challenge_config_id"]
            isOneToOne: false
            referencedRelation: "challenge_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenges_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "challenges_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenges_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "challenges_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_challenges_challenged_id"
            columns: ["challenged_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_challenges_challenged_id"
            columns: ["challenged_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_challenges_challenged_id"
            columns: ["challenged_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_challenges_challenger_id"
            columns: ["challenger_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_challenges_challenger_id"
            columns: ["challenger_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_challenges_challenger_id"
            columns: ["challenger_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          attachments: Json | null
          created_at: string | null
          edited_at: string | null
          id: string
          is_deleted: boolean | null
          message: string
          message_type: string | null
          reply_to: string | null
          room_id: string | null
          sender_id: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_deleted?: boolean | null
          message: string
          message_type?: string | null
          reply_to?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_deleted?: boolean | null
          message?: string
          message_type?: string | null
          reply_to?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_messages_sender_id"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_messages_sender_id"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_chat_messages_sender_id"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_room_members: {
        Row: {
          created_at: string | null
          id: string
          joined_at: string | null
          last_read_at: string | null
          role: string | null
          room_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          role?: string | null
          room_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          role?: string | null
          room_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_room_settings: {
        Row: {
          created_at: string | null
          custom_nickname: string | null
          id: string
          is_muted: boolean | null
          is_pinned: boolean | null
          notifications_enabled: boolean | null
          room_id: string
          sound_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          custom_nickname?: string | null
          id?: string
          is_muted?: boolean | null
          is_pinned?: boolean | null
          notifications_enabled?: boolean | null
          room_id: string
          sound_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          custom_nickname?: string | null
          id?: string
          is_muted?: boolean | null
          is_pinned?: boolean | null
          notifications_enabled?: boolean | null
          room_id?: string
          sound_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_room_settings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_room_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_room_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_room_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          club_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_private: boolean | null
          last_message_at: string | null
          name: string | null
          room_type: string | null
          type: string | null
          updated_at: string | null
          user1_id: string | null
          user2_id: string | null
        }
        Insert: {
          club_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          last_message_at?: string | null
          name?: string | null
          room_type?: string | null
          type?: string | null
          updated_at?: string | null
          user1_id?: string | null
          user2_id?: string | null
        }
        Update: {
          club_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          last_message_at?: string | null
          name?: string | null
          room_type?: string | null
          type?: string | null
          updated_at?: string | null
          user1_id?: string | null
          user2_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "chat_rooms_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_rooms_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "fk_chat_rooms_user1_id"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_rooms_user1_id"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_chat_rooms_user1_id"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_rooms_user2_id"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_rooms_user2_id"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_chat_rooms_user2_id"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      club_activity_logs: {
        Row: {
          action: string
          activity_type: string
          club_id: string
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          activity_type: string
          club_id: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          activity_type?: string
          club_id?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_activity_logs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_activity_logs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_activity_logs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "club_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      club_additional_services: {
        Row: {
          club_id: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_additional_services_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_additional_services_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_additional_services_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_follows: {
        Row: {
          club_id: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          club_id: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          club_id?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      club_members: {
        Row: {
          club_id: string | null
          created_at: string | null
          id: string
          is_favorite: boolean | null
          joined_at: string | null
          role: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          club_id?: string | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          joined_at?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          club_id?: string | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          joined_at?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "club_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      club_membership_fees: {
        Row: {
          benefits: string | null
          club_id: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          monthly_fee: number
          name: string
          updated_at: string | null
          yearly_fee: number
        }
        Insert: {
          benefits?: string | null
          club_id: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          monthly_fee: number
          name: string
          updated_at?: string | null
          yearly_fee: number
        }
        Update: {
          benefits?: string | null
          club_id?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          monthly_fee?: number
          name?: string
          updated_at?: string | null
          yearly_fee?: number
        }
        Relationships: [
          {
            foreignKeyName: "club_membership_fees_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_membership_fees_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_membership_fees_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_notification_settings: {
        Row: {
          club_id: string
          created_at: string | null
          enable_email: boolean | null
          enable_push: boolean | null
          enable_quiet_hours: boolean | null
          enable_sms: boolean | null
          id: string
          notify_on_match_completed: boolean | null
          notify_on_match_created: boolean | null
          notify_on_member_approval: boolean | null
          notify_on_member_rejection: boolean | null
          notify_on_member_request: boolean | null
          notify_on_new_member: boolean | null
          notify_on_new_post: boolean | null
          notify_on_post_comment: boolean | null
          notify_on_post_like: boolean | null
          notify_on_rank_change: boolean | null
          notify_on_rank_verification: boolean | null
          notify_on_score_input: boolean | null
          notify_on_tournament_end: boolean | null
          notify_on_tournament_registration: boolean | null
          notify_on_tournament_start: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          updated_at: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          enable_email?: boolean | null
          enable_push?: boolean | null
          enable_quiet_hours?: boolean | null
          enable_sms?: boolean | null
          id?: string
          notify_on_match_completed?: boolean | null
          notify_on_match_created?: boolean | null
          notify_on_member_approval?: boolean | null
          notify_on_member_rejection?: boolean | null
          notify_on_member_request?: boolean | null
          notify_on_new_member?: boolean | null
          notify_on_new_post?: boolean | null
          notify_on_post_comment?: boolean | null
          notify_on_post_like?: boolean | null
          notify_on_rank_change?: boolean | null
          notify_on_rank_verification?: boolean | null
          notify_on_score_input?: boolean | null
          notify_on_tournament_end?: boolean | null
          notify_on_tournament_registration?: boolean | null
          notify_on_tournament_start?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          enable_email?: boolean | null
          enable_push?: boolean | null
          enable_quiet_hours?: boolean | null
          enable_sms?: boolean | null
          id?: string
          notify_on_match_completed?: boolean | null
          notify_on_match_created?: boolean | null
          notify_on_member_approval?: boolean | null
          notify_on_member_rejection?: boolean | null
          notify_on_member_request?: boolean | null
          notify_on_new_member?: boolean | null
          notify_on_new_post?: boolean | null
          notify_on_post_comment?: boolean | null
          notify_on_post_like?: boolean | null
          notify_on_rank_change?: boolean | null
          notify_on_rank_verification?: boolean | null
          notify_on_score_input?: boolean | null
          notify_on_tournament_end?: boolean | null
          notify_on_tournament_registration?: boolean | null
          notify_on_tournament_start?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_notification_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_notification_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_notification_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_payment_config: {
        Row: {
          club_id: string
          config: Json
          created_at: string | null
          gateway_type: string
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          club_id: string
          config: Json
          created_at?: string | null
          gateway_type: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          config?: Json
          created_at?: string | null
          gateway_type?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_payment_config_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_payment_config_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_payment_config_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_payment_settings: {
        Row: {
          bank_accounts: Json | null
          bank_enabled: boolean | null
          cash_enabled: boolean | null
          club_id: string
          created_at: string | null
          ewallet_accounts: Json | null
          ewallet_enabled: boolean | null
          id: string
          updated_at: string | null
          vnpay_config: Json | null
          vnpay_enabled: boolean | null
        }
        Insert: {
          bank_accounts?: Json | null
          bank_enabled?: boolean | null
          cash_enabled?: boolean | null
          club_id: string
          created_at?: string | null
          ewallet_accounts?: Json | null
          ewallet_enabled?: boolean | null
          id?: string
          updated_at?: string | null
          vnpay_config?: Json | null
          vnpay_enabled?: boolean | null
        }
        Update: {
          bank_accounts?: Json | null
          bank_enabled?: boolean | null
          cash_enabled?: boolean | null
          club_id?: string
          created_at?: string | null
          ewallet_accounts?: Json | null
          ewallet_enabled?: boolean | null
          id?: string
          updated_at?: string | null
          vnpay_config?: Json | null
          vnpay_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "club_payment_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_payment_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_payment_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_payments: {
        Row: {
          amount: number
          club_id: string
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          metadata: Json | null
          paid_at: string | null
          payment_method: string | null
          payment_type: string
          status: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          club_id: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_type: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          club_id?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_type?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_permissions: {
        Row: {
          can_input_score: boolean | null
          can_manage_members: boolean | null
          can_manage_permissions: boolean | null
          can_manage_tables: boolean | null
          can_verify_rank: boolean | null
          can_view_reports: boolean | null
          club_id: string
          granted_at: string | null
          granted_by: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          can_input_score?: boolean | null
          can_manage_members?: boolean | null
          can_manage_permissions?: boolean | null
          can_manage_tables?: boolean | null
          can_verify_rank?: boolean | null
          can_view_reports?: boolean | null
          club_id: string
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          can_input_score?: boolean | null
          can_manage_members?: boolean | null
          can_manage_permissions?: boolean | null
          can_manage_tables?: boolean | null
          can_verify_rank?: boolean | null
          can_view_reports?: boolean | null
          club_id?: string
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_permissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_permissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_permissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "club_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "club_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      club_photos: {
        Row: {
          club_id: string
          created_at: string | null
          id: string
          photo_url: string
          updated_at: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          id?: string
          photo_url: string
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          id?: string
          photo_url?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_photos_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_photos_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_photos_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_promotions: {
        Row: {
          club_id: string
          created_at: string | null
          current_usage: number | null
          description: string | null
          discount_type: string | null
          discount_value: number | null
          end_date: string
          id: string
          image_url: string | null
          is_active: boolean | null
          maximum_discount: number | null
          metadata: Json | null
          minimum_purchase: number | null
          promotion_type: string
          start_date: string
          terms_and_conditions: string | null
          title: string
          updated_at: string | null
          usage_limit: number | null
          usage_limit_per_user: number | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          current_usage?: number | null
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          end_date: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          maximum_discount?: number | null
          metadata?: Json | null
          minimum_purchase?: number | null
          promotion_type: string
          start_date: string
          terms_and_conditions?: string | null
          title: string
          updated_at?: string | null
          usage_limit?: number | null
          usage_limit_per_user?: number | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          current_usage?: number | null
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          end_date?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          maximum_discount?: number | null
          metadata?: Json | null
          minimum_purchase?: number | null
          promotion_type?: string
          start_date?: string
          terms_and_conditions?: string | null
          title?: string
          updated_at?: string | null
          usage_limit?: number | null
          usage_limit_per_user?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "club_promotions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_promotions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_promotions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_reviews: {
        Row: {
          atmosphere_rating: number | null
          club_id: string | null
          comment: string | null
          created_at: string | null
          facility_rating: number | null
          helpful_count: number | null
          id: string
          image_urls: string[] | null
          price_rating: number | null
          rating: number
          review_text: string | null
          service_rating: number | null
          updated_at: string | null
          user_id: string | null
          visit_date: string | null
        }
        Insert: {
          atmosphere_rating?: number | null
          club_id?: string | null
          comment?: string | null
          created_at?: string | null
          facility_rating?: number | null
          helpful_count?: number | null
          id?: string
          image_urls?: string[] | null
          price_rating?: number | null
          rating: number
          review_text?: string | null
          service_rating?: number | null
          updated_at?: string | null
          user_id?: string | null
          visit_date?: string | null
        }
        Update: {
          atmosphere_rating?: number | null
          club_id?: string | null
          comment?: string | null
          created_at?: string | null
          facility_rating?: number | null
          helpful_count?: number | null
          id?: string
          image_urls?: string[] | null
          price_rating?: number | null
          rating?: number
          review_text?: string | null
          service_rating?: number | null
          updated_at?: string | null
          user_id?: string | null
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_reviews_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_reviews_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_reviews_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "club_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      club_spa_balances: {
        Row: {
          available_spa: number | null
          club_id: string
          created_at: string | null
          id: string
          last_allocation_at: string | null
          reserved_spa: number | null
          spent_spa: number | null
          total_spa_allocated: number | null
          updated_at: string | null
        }
        Insert: {
          available_spa?: number | null
          club_id: string
          created_at?: string | null
          id?: string
          last_allocation_at?: string | null
          reserved_spa?: number | null
          spent_spa?: number | null
          total_spa_allocated?: number | null
          updated_at?: string | null
        }
        Update: {
          available_spa?: number | null
          club_id?: string
          created_at?: string | null
          id?: string
          last_allocation_at?: string | null
          reserved_spa?: number | null
          spent_spa?: number | null
          total_spa_allocated?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_spa_balances_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_spa_balances_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_spa_balances_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      club_staff: {
        Row: {
          can_enter_scores: boolean | null
          can_manage_staff: boolean | null
          can_manage_tournaments: boolean | null
          can_view_reports: boolean | null
          club_id: string
          commission_rate: number | null
          created_at: string | null
          hired_at: string | null
          id: string
          is_active: boolean | null
          notes: string | null
          staff_role: string | null
          terminated_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          can_enter_scores?: boolean | null
          can_manage_staff?: boolean | null
          can_manage_tournaments?: boolean | null
          can_view_reports?: boolean | null
          club_id: string
          commission_rate?: number | null
          created_at?: string | null
          hired_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          staff_role?: string | null
          terminated_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          can_enter_scores?: boolean | null
          can_manage_staff?: boolean | null
          can_manage_tournaments?: boolean | null
          can_view_reports?: boolean | null
          club_id?: string
          commission_rate?: number | null
          created_at?: string | null
          hired_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          staff_role?: string | null
          terminated_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_staff_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_staff_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_staff_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "club_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      club_table_rates: {
        Row: {
          club_id: string
          created_at: string | null
          description: string | null
          display_order: number | null
          hourly_rate: number
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          hourly_rate: number
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          hourly_rate?: number
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "club_table_rates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "club_table_rates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_table_rates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      clubs: {
        Row: {
          address: string | null
          amenities: string[] | null
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          attendance_qr_code: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          email: string | null
          established_year: number | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          opening_hours: Json | null
          owner_id: string | null
          phone: string | null
          price_per_hour: number | null
          profile_image_url: string | null
          qr_created_at: string | null
          qr_secret_key: string | null
          rating: number | null
          rejection_reason: string | null
          total_reviews: number | null
          total_tables: number | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          attendance_qr_code?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          established_year?: number | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          opening_hours?: Json | null
          owner_id?: string | null
          phone?: string | null
          price_per_hour?: number | null
          profile_image_url?: string | null
          qr_created_at?: string | null
          qr_secret_key?: string | null
          rating?: number | null
          rejection_reason?: string | null
          total_reviews?: number | null
          total_tables?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          attendance_qr_code?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          established_year?: number | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          opening_hours?: Json | null
          owner_id?: string | null
          phone?: string | null
          price_per_hour?: number | null
          profile_image_url?: string | null
          qr_created_at?: string | null
          qr_secret_key?: string | null
          rating?: number | null
          rejection_reason?: string | null
          total_reviews?: number | null
          total_tables?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clubs_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "clubs_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_owner_id_users_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_owner_id_users_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "clubs_owner_id_users_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          like_count: number | null
          likes_count: number | null
          parent_comment_id: string | null
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          like_count?: number | null
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          like_count?: number | null
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_transactions: {
        Row: {
          amount: number
          club_id: string
          commission_amount: number | null
          commission_eligible: boolean | null
          commission_rate: number | null
          created_at: string | null
          customer_id: string
          description: string | null
          id: string
          match_id: string | null
          payment_method: string | null
          staff_referral_id: string | null
          tournament_id: string | null
          transaction_date: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          club_id: string
          commission_amount?: number | null
          commission_eligible?: boolean | null
          commission_rate?: number | null
          created_at?: string | null
          customer_id: string
          description?: string | null
          id?: string
          match_id?: string | null
          payment_method?: string | null
          staff_referral_id?: string | null
          tournament_id?: string | null
          transaction_date?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          club_id?: string
          commission_amount?: number | null
          commission_eligible?: boolean | null
          commission_rate?: number | null
          created_at?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          match_id?: string | null
          payment_method?: string | null
          staff_referral_id?: string | null
          tournament_id?: string | null
          transaction_date?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "customer_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "customer_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "customer_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_transactions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_transactions_staff_referral_id_fkey"
            columns: ["staff_referral_id"]
            isOneToOne: false
            referencedRelation: "staff_referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_transactions_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_transactions_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "customer_transactions_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      device_tokens: {
        Row: {
          created_at: string | null
          device_id: string | null
          device_name: string | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          platform: string
          token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          platform: string
          token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          platform?: string
          token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "device_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "device_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      elo_history: {
        Row: {
          change_reason: string | null
          club_id: string | null
          created_at: string | null
          elo_change: number
          id: string
          match_id: string | null
          metadata: Json | null
          new_elo: number
          old_elo: number
          reason: string
          tournament_id: string | null
          user_id: string
        }
        Insert: {
          change_reason?: string | null
          club_id?: string | null
          created_at?: string | null
          elo_change: number
          id?: string
          match_id?: string | null
          metadata?: Json | null
          new_elo: number
          old_elo: number
          reason: string
          tournament_id?: string | null
          user_id: string
        }
        Update: {
          change_reason?: string | null
          club_id?: string | null
          created_at?: string | null
          elo_change?: number
          id?: string
          match_id?: string | null
          metadata?: Json | null
          new_elo?: number
          old_elo?: number
          reason?: string
          tournament_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "elo_history_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "elo_history_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "elo_history_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "elo_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "elo_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "elo_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      fraud_detection_rules: {
        Row: {
          action: string | null
          club_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          parameters: Json
          rule_name: string
          rule_type: string
          threshold: number | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          action?: string | null
          club_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          parameters?: Json
          rule_name: string
          rule_type: string
          threshold?: number | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          action?: string | null
          club_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          parameters?: Json
          rule_name?: string
          rule_type?: string
          threshold?: number | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fraud_detection_rules_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "fraud_detection_rules_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fraud_detection_rules_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      game_formats: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          format_name: string
          game_type: string
          id: string
          is_active: boolean | null
          rules: Json | null
          scoring_system: Json | null
          time_limits: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          format_name: string
          game_type: string
          id?: string
          is_active?: boolean | null
          rules?: Json | null
          scoring_system?: Json | null
          time_limits?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          format_name?: string
          game_type?: string
          id?: string
          is_active?: boolean | null
          rules?: Json | null
          scoring_system?: Json | null
          time_limits?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      handicap_rules: {
        Row: {
          bet_amount: number
          created_at: string | null
          description: string | null
          description_vi: string | null
          handicap_value: number
          id: string
          rank_difference_type: string
          rank_difference_value: number
        }
        Insert: {
          bet_amount: number
          created_at?: string | null
          description?: string | null
          description_vi?: string | null
          handicap_value: number
          id?: string
          rank_difference_type: string
          rank_difference_value: number
        }
        Update: {
          bet_amount?: number
          created_at?: string | null
          description?: string | null
          description_vi?: string | null
          handicap_value?: number
          id?: string
          rank_difference_type?: string
          rank_difference_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "handicap_rules_bet_amount_fkey"
            columns: ["bet_amount"]
            isOneToOne: false
            referencedRelation: "challenge_configurations"
            referencedColumns: ["bet_amount"]
          },
        ]
      }
      hidden_posts: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hidden_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hidden_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hidden_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "hidden_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          club_id: string | null
          created_at: string | null
          currency: string | null
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string | null
          items: Json | null
          metadata: Json | null
          notes: string | null
          paid_date: string | null
          payment_id: string | null
          status: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date?: string | null
          items?: Json | null
          metadata?: Json | null
          notes?: string | null
          paid_date?: string | null
          payment_id?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string | null
          items?: Json | null
          metadata?: Json | null
          notes?: string | null
          paid_date?: string | null
          payment_id?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "invoices_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "invoices_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_programs: {
        Row: {
          bonus_birthday_multiplier: number | null
          bonus_weekend_multiplier: number | null
          club_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          enable_point_expiry: boolean | null
          id: string
          is_active: boolean | null
          points_expire_months: number | null
          points_per_game: number | null
          points_per_hour: number | null
          points_per_vnd: number | null
          program_name: string
          tier_system: Json | null
          updated_at: string | null
        }
        Insert: {
          bonus_birthday_multiplier?: number | null
          bonus_weekend_multiplier?: number | null
          club_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          enable_point_expiry?: boolean | null
          id?: string
          is_active?: boolean | null
          points_expire_months?: number | null
          points_per_game?: number | null
          points_per_hour?: number | null
          points_per_vnd?: number | null
          program_name?: string
          tier_system?: Json | null
          updated_at?: string | null
        }
        Update: {
          bonus_birthday_multiplier?: number | null
          bonus_weekend_multiplier?: number | null
          club_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          enable_point_expiry?: boolean | null
          id?: string
          is_active?: boolean | null
          points_expire_months?: number | null
          points_per_game?: number | null
          points_per_hour?: number | null
          points_per_vnd?: number | null
          program_name?: string
          tier_system?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_programs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "loyalty_programs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_programs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      loyalty_reward_redemptions: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          approved_by: string | null
          cancelled_at: string | null
          club_id: string
          fulfilled_at: string | null
          fulfilled_by: string | null
          id: string
          metadata: Json | null
          notes: string | null
          points_spent: number
          redeemed_at: string | null
          redemption_code: string | null
          redemption_status: string | null
          reward_id: string
          user_id: string
          user_tier_at_redemption: string | null
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          cancelled_at?: string | null
          club_id: string
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          points_spent: number
          redeemed_at?: string | null
          redemption_code?: string | null
          redemption_status?: string | null
          reward_id: string
          user_id: string
          user_tier_at_redemption?: string | null
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          cancelled_at?: string | null
          club_id?: string
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          points_spent?: number
          redeemed_at?: string | null
          redemption_code?: string | null
          redemption_status?: string | null
          reward_id?: string
          user_id?: string
          user_tier_at_redemption?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_reward_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "loyalty_reward_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_reward_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "loyalty_reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "loyalty_rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loyalty_reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_rewards: {
        Row: {
          club_id: string
          created_at: string | null
          created_by: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          min_tier_required: string | null
          points_cost: number
          quantity_redeemed: number | null
          quantity_remaining: number | null
          quantity_total: number | null
          reward_description: string | null
          reward_image_url: string | null
          reward_name: string
          reward_type: string
          reward_value: Json
          tags: string[] | null
          tier_required: string | null
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          min_tier_required?: string | null
          points_cost: number
          quantity_redeemed?: number | null
          quantity_remaining?: number | null
          quantity_total?: number | null
          reward_description?: string | null
          reward_image_url?: string | null
          reward_name: string
          reward_type: string
          reward_value?: Json
          tags?: string[] | null
          tier_required?: string | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          min_tier_required?: string | null
          points_cost?: number
          quantity_redeemed?: number | null
          quantity_remaining?: number | null
          quantity_total?: number | null
          reward_description?: string | null
          reward_image_url?: string | null
          reward_name?: string
          reward_type?: string
          reward_value?: Json
          tags?: string[] | null
          tier_required?: string | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_rewards_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "loyalty_rewards_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_rewards_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      loyalty_transactions: {
        Row: {
          balance_after: number
          balance_before: number
          base_points: number | null
          club_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_expired: boolean | null
          metadata: Json | null
          multiplier: number | null
          points_amount: number
          program_id: string
          reference_id: string | null
          reference_type: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          balance_after: number
          balance_before: number
          base_points?: number | null
          club_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_expired?: boolean | null
          metadata?: Json | null
          multiplier?: number | null
          points_amount: number
          program_id: string
          reference_id?: string | null
          reference_type?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          balance_after?: number
          balance_before?: number
          base_points?: number | null
          club_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_expired?: boolean | null
          metadata?: Json | null
          multiplier?: number | null
          points_amount?: number
          program_id?: string
          reference_id?: string | null
          reference_type?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "loyalty_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "loyalty_transactions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "loyalty_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "loyalty_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          bracket_format: string | null
          bracket_group: string | null
          bracket_position: number | null
          bracket_type: string | null
          club_id: string | null
          created_at: string | null
          display_order: number | null
          duration_minutes: number | null
          end_time: string | null
          group_id: string | null
          id: string
          invitation_type: string | null
          is_final: boolean | null
          is_live: boolean | null
          is_third_place: boolean | null
          location: string | null
          loser_advances_to: number | null
          match_conditions: Json | null
          match_date: string | null
          match_level: number | null
          match_number: number
          match_type: string | null
          next_match_id: string | null
          notes: string | null
          parent_match_id: string | null
          played_at: string | null
          player1_id: string | null
          player1_score: number | null
          player2_id: string | null
          player2_score: number | null
          round: string | null
          round_number: number | null
          scheduled_time: string | null
          score_player1: number | null
          score_player2: number | null
          spa_payout_processed: boolean | null
          spa_stakes_amount: number | null
          stage_round: number | null
          stakes_type: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["match_status"] | null
          tournament_id: string | null
          updated_at: string | null
          video_urls: string[] | null
          winner_advances_to: number | null
          winner_id: string | null
        }
        Insert: {
          bracket_format?: string | null
          bracket_group?: string | null
          bracket_position?: number | null
          bracket_type?: string | null
          club_id?: string | null
          created_at?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          end_time?: string | null
          group_id?: string | null
          id?: string
          invitation_type?: string | null
          is_final?: boolean | null
          is_live?: boolean | null
          is_third_place?: boolean | null
          location?: string | null
          loser_advances_to?: number | null
          match_conditions?: Json | null
          match_date?: string | null
          match_level?: number | null
          match_number: number
          match_type?: string | null
          next_match_id?: string | null
          notes?: string | null
          parent_match_id?: string | null
          played_at?: string | null
          player1_id?: string | null
          player1_score?: number | null
          player2_id?: string | null
          player2_score?: number | null
          round?: string | null
          round_number?: number | null
          scheduled_time?: string | null
          score_player1?: number | null
          score_player2?: number | null
          spa_payout_processed?: boolean | null
          spa_stakes_amount?: number | null
          stage_round?: number | null
          stakes_type?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["match_status"] | null
          tournament_id?: string | null
          updated_at?: string | null
          video_urls?: string[] | null
          winner_advances_to?: number | null
          winner_id?: string | null
        }
        Update: {
          bracket_format?: string | null
          bracket_group?: string | null
          bracket_position?: number | null
          bracket_type?: string | null
          club_id?: string | null
          created_at?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          end_time?: string | null
          group_id?: string | null
          id?: string
          invitation_type?: string | null
          is_final?: boolean | null
          is_live?: boolean | null
          is_third_place?: boolean | null
          location?: string | null
          loser_advances_to?: number | null
          match_conditions?: Json | null
          match_date?: string | null
          match_level?: number | null
          match_number?: number
          match_type?: string | null
          next_match_id?: string | null
          notes?: string | null
          parent_match_id?: string | null
          played_at?: string | null
          player1_id?: string | null
          player1_score?: number | null
          player2_id?: string | null
          player2_score?: number | null
          round?: string | null
          round_number?: number | null
          scheduled_time?: string | null
          score_player1?: number | null
          score_player2?: number | null
          spa_payout_processed?: boolean | null
          spa_stakes_amount?: number | null
          stage_round?: number | null
          stakes_type?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["match_status"] | null
          tournament_id?: string | null
          updated_at?: string | null
          video_urls?: string[] | null
          winner_advances_to?: number | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "matches_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "matches_player1_id_fkey"
            columns: ["player1_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_player1_id_fkey"
            columns: ["player1_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_player1_id_fkey"
            columns: ["player1_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_player2_id_fkey"
            columns: ["player2_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_player2_id_fkey"
            columns: ["player2_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_player2_id_fkey"
            columns: ["player2_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      member_activities: {
        Row: {
          action: string
          club_id: string | null
          created_at: string | null
          description: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          club_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          club_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_activities_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "member_activities_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_activities_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      member_statistics: {
        Row: {
          average_score: number | null
          club_id: string | null
          id: string
          last_activity_at: string | null
          matches_lost: number | null
          matches_played: number | null
          matches_won: number | null
          total_score: number | null
          tournaments_joined: number | null
          tournaments_won: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          average_score?: number | null
          club_id?: string | null
          id?: string
          last_activity_at?: string | null
          matches_lost?: number | null
          matches_played?: number | null
          matches_won?: number | null
          total_score?: number | null
          tournaments_joined?: number | null
          tournaments_won?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          average_score?: number | null
          club_id?: string | null
          id?: string
          last_activity_at?: string | null
          matches_lost?: number | null
          matches_played?: number | null
          matches_won?: number | null
          total_score?: number | null
          tournaments_joined?: number | null
          tournaments_won?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_statistics_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "member_statistics_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_statistics_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      membership_policies: {
        Row: {
          allow_guest_access: boolean | null
          club_id: string
          created_at: string | null
          deposit_amount: number | null
          enable_auto_renewal: boolean | null
          id: string
          max_age: number | null
          max_members_limit: number | null
          min_age: number | null
          privacy_policy: string | null
          renewal_reminder_days: number | null
          required_documents: Json | null
          requires_approval: boolean | null
          requires_deposit: boolean | null
          terms_and_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          allow_guest_access?: boolean | null
          club_id: string
          created_at?: string | null
          deposit_amount?: number | null
          enable_auto_renewal?: boolean | null
          id?: string
          max_age?: number | null
          max_members_limit?: number | null
          min_age?: number | null
          privacy_policy?: string | null
          renewal_reminder_days?: number | null
          required_documents?: Json | null
          requires_approval?: boolean | null
          requires_deposit?: boolean | null
          terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          allow_guest_access?: boolean | null
          club_id?: string
          created_at?: string | null
          deposit_amount?: number | null
          enable_auto_renewal?: boolean | null
          id?: string
          max_age?: number | null
          max_members_limit?: number | null
          min_age?: number | null
          privacy_policy?: string | null
          renewal_reminder_days?: number | null
          required_documents?: Json | null
          requires_approval?: boolean | null
          requires_deposit?: boolean | null
          terms_and_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_policies_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "membership_policies_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_policies_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: true
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      membership_requests: {
        Row: {
          additional_data: Json | null
          club_id: string | null
          created_at: string | null
          id: string
          membership_type: string | null
          message: string | null
          notes: string | null
          processed_at: string | null
          processed_by: string | null
          rejection_reason: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_data?: Json | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          membership_type?: string | null
          message?: string | null
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          rejection_reason?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_data?: Json | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          membership_type?: string | null
          message?: string | null
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          rejection_reason?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "membership_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      membership_types: {
        Row: {
          benefits: Json | null
          club_id: string
          color: string | null
          created_at: string | null
          daily_fee: number | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          max_members: number | null
          monthly_fee: number | null
          name: string
          priority: number | null
          requires_approval: boolean | null
          updated_at: string | null
          yearly_fee: number | null
        }
        Insert: {
          benefits?: Json | null
          club_id: string
          color?: string | null
          created_at?: string | null
          daily_fee?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          monthly_fee?: number | null
          name: string
          priority?: number | null
          requires_approval?: boolean | null
          updated_at?: string | null
          yearly_fee?: number | null
        }
        Update: {
          benefits?: Json | null
          club_id?: string
          color?: string | null
          created_at?: string | null
          daily_fee?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          monthly_fee?: number | null
          name?: string
          priority?: number | null
          requires_approval?: boolean | null
          updated_at?: string | null
          yearly_fee?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_types_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "membership_types_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_types_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      notification_analytics: {
        Row: {
          created_at: string | null
          device_id: string | null
          event_type: string
          id: string
          metadata: Json | null
          notification_id: string | null
          platform: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          notification_id?: string | null
          platform?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          notification_id?: string | null
          platform?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          all_notifications_enabled: boolean | null
          challenge_notifications_enabled: boolean | null
          club_notifications_enabled: boolean | null
          created_at: string | null
          email_notifications_enabled: boolean | null
          id: string
          match_notifications_enabled: boolean | null
          push_notifications_enabled: boolean | null
          quiet_hours_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          social_notifications_enabled: boolean | null
          system_notifications_enabled: boolean | null
          tournament_notifications_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          all_notifications_enabled?: boolean | null
          challenge_notifications_enabled?: boolean | null
          club_notifications_enabled?: boolean | null
          created_at?: string | null
          email_notifications_enabled?: boolean | null
          id?: string
          match_notifications_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          social_notifications_enabled?: boolean | null
          system_notifications_enabled?: boolean | null
          tournament_notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          all_notifications_enabled?: boolean | null
          challenge_notifications_enabled?: boolean | null
          club_notifications_enabled?: boolean | null
          created_at?: string | null
          email_notifications_enabled?: boolean | null
          id?: string
          match_notifications_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          social_notifications_enabled?: boolean | null
          system_notifications_enabled?: boolean | null
          tournament_notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          message_template: string
          name: string
          title_template: string
          type: string
          updated_at: string | null
          usage_count: number | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          message_template: string
          name: string
          title_template: string
          type: string
          updated_at?: string | null
          usage_count?: number | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          message_template?: string
          name?: string
          title_template?: string
          type?: string
          updated_at?: string | null
          usage_count?: number | null
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_data: Json | null
          action_type: string | null
          clicked_at: string | null
          club_id: string | null
          created_at: string | null
          data: Json | null
          delivered_at: string | null
          expires_at: string | null
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          message: string
          priority: string | null
          read_at: string | null
          status: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type?: string | null
          clicked_at?: string | null
          club_id?: string | null
          created_at?: string | null
          data?: Json | null
          delivered_at?: string | null
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message: string
          priority?: string | null
          read_at?: string | null
          status?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string | null
          clicked_at?: string | null
          club_id?: string | null
          created_at?: string | null
          data?: Json | null
          delivered_at?: string | null
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message?: string
          priority?: string | null
          read_at?: string | null
          status?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      notifications_archive: {
        Row: {
          action_data: Json | null
          action_type: string | null
          club_id: string | null
          created_at: string | null
          data: Json | null
          expires_at: string | null
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          message: string
          priority: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type?: string | null
          club_id?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message: string
          priority?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string | null
          club_id?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message?: string
          priority?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          otp_code: string
          phone: string
          purpose: string | null
          used: boolean | null
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          otp_code: string
          phone: string
          purpose?: string | null
          used?: boolean | null
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          otp_code?: string
          phone?: string
          purpose?: string | null
          used?: boolean | null
          used_at?: string | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          account_holder: string | null
          account_number: string | null
          bank_name: string | null
          club_id: string
          config: Json
          created_at: string | null
          daily_limit: number | null
          deleted_at: string | null
          description: string | null
          display_order: number | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          max_amount: number | null
          metadata: Json | null
          method_name: string
          method_type: string
          min_amount: number | null
          qr_code_path: string | null
          qr_code_url: string | null
          transaction_fee_fixed: number | null
          transaction_fee_percent: number | null
          updated_at: string | null
        }
        Insert: {
          account_holder?: string | null
          account_number?: string | null
          bank_name?: string | null
          club_id: string
          config: Json
          created_at?: string | null
          daily_limit?: number | null
          deleted_at?: string | null
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          max_amount?: number | null
          metadata?: Json | null
          method_name: string
          method_type: string
          min_amount?: number | null
          qr_code_path?: string | null
          qr_code_url?: string | null
          transaction_fee_fixed?: number | null
          transaction_fee_percent?: number | null
          updated_at?: string | null
        }
        Update: {
          account_holder?: string | null
          account_number?: string | null
          bank_name?: string | null
          club_id?: string
          config?: Json
          created_at?: string | null
          daily_limit?: number | null
          deleted_at?: string | null
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          max_amount?: number | null
          metadata?: Json | null
          method_name?: string
          method_type?: string
          min_amount?: number | null
          qr_code_path?: string | null
          qr_code_url?: string | null
          transaction_fee_fixed?: number | null
          transaction_fee_percent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "payment_methods_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_methods_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          gateway: string | null
          gateway_response: Json | null
          gateway_transaction_id: string | null
          id: string
          metadata: Json | null
          notes: string | null
          original_transaction_id: string | null
          payment_id: string | null
          processed_at: string | null
          reconciled: boolean | null
          reconciled_at: string | null
          reconciled_by: string | null
          refund_amount: number | null
          refund_reason: string | null
          status: string
          transaction_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          gateway?: string | null
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          original_transaction_id?: string | null
          payment_id?: string | null
          processed_at?: string | null
          reconciled?: boolean | null
          reconciled_at?: string | null
          reconciled_by?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          status?: string
          transaction_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          gateway?: string | null
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          original_transaction_id?: string | null
          payment_id?: string | null
          processed_at?: string | null
          reconciled?: boolean | null
          reconciled_at?: string | null
          reconciled_by?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          status?: string
          transaction_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_original_transaction_id_fkey"
            columns: ["original_transaction_id"]
            isOneToOne: false
            referencedRelation: "payment_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_reconciled_by_fkey"
            columns: ["reconciled_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_reconciled_by_fkey"
            columns: ["reconciled_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payment_transactions_reconciled_by_fkey"
            columns: ["reconciled_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payment_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          club_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          error_message: string | null
          gateway_response: Json | null
          id: string
          metadata: Json | null
          paid_at: string | null
          payment_method: string | null
          payment_type: string | null
          reference_id: string | null
          status: string
          tournament_id: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string | null
          voucher_id: string | null
        }
        Insert: {
          amount: number
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          error_message?: string | null
          gateway_response?: Json | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_type?: string | null
          reference_id?: string | null
          status?: string
          tournament_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          voucher_id?: string | null
        }
        Update: {
          amount?: number
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          error_message?: string | null
          gateway_response?: Json | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_type?: string | null
          reference_id?: string | null
          status?: string
          tournament_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          voucher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          category: string | null
          created_at: string | null
          data_type: string | null
          description: string | null
          id: string
          is_editable: boolean | null
          is_public: boolean | null
          setting_key: string
          setting_value: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_editable?: boolean | null
          is_public?: boolean | null
          setting_key: string
          setting_value: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_editable?: boolean | null
          is_public?: boolean | null
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "platform_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      popular_hashtags: {
        Row: {
          created_at: string | null
          hashtag: string
          id: string
          last_used_at: string | null
          use_count: number | null
        }
        Insert: {
          created_at?: string | null
          hashtag: string
          id?: string
          last_used_at?: string | null
          use_count?: number | null
        }
        Update: {
          created_at?: string | null
          hashtag?: string
          id?: string
          last_used_at?: string | null
          use_count?: number | null
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_interactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "post_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          auto_posted: boolean | null
          club_id: string | null
          comment_count: number | null
          comments_count: number | null
          content: string | null
          created_at: string | null
          hashtags: string[] | null
          id: string
          image_urls: string[] | null
          is_featured: boolean | null
          is_pinned: boolean | null
          is_public: boolean | null
          like_count: number | null
          likes_count: number | null
          location: string | null
          match_id: string | null
          post_trigger: string | null
          post_type: Database["public"]["Enums"]["post_type"] | null
          scheduled_post_time: string | null
          share_count: number | null
          tournament_id: string | null
          updated_at: string | null
          user_id: string | null
          video_duration: number | null
          video_platform: string | null
          video_thumbnail_url: string | null
          video_uploaded_at: string | null
          video_url: string | null
          visibility: string | null
        }
        Insert: {
          auto_posted?: boolean | null
          club_id?: string | null
          comment_count?: number | null
          comments_count?: number | null
          content?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          is_pinned?: boolean | null
          is_public?: boolean | null
          like_count?: number | null
          likes_count?: number | null
          location?: string | null
          match_id?: string | null
          post_trigger?: string | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          scheduled_post_time?: string | null
          share_count?: number | null
          tournament_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_duration?: number | null
          video_platform?: string | null
          video_thumbnail_url?: string | null
          video_uploaded_at?: string | null
          video_url?: string | null
          visibility?: string | null
        }
        Update: {
          auto_posted?: boolean | null
          club_id?: string | null
          comment_count?: number | null
          comments_count?: number | null
          content?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          is_pinned?: boolean | null
          is_public?: boolean | null
          like_count?: number | null
          likes_count?: number | null
          location?: string | null
          match_id?: string | null
          post_trigger?: string | null
          post_type?: Database["public"]["Enums"]["post_type"] | null
          scheduled_post_time?: string | null
          share_count?: number | null
          tournament_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_duration?: number | null
          video_platform?: string | null
          video_thumbnail_url?: string | null
          video_uploaded_at?: string | null
          video_url?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "posts_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "posts_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "posts_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prize_pool_configurations: {
        Row: {
          calculation_method: string | null
          config_name: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          participant_ranges: Json
          prize_distribution: Json
          tournament_type: string | null
          updated_at: string | null
        }
        Insert: {
          calculation_method?: string | null
          config_name: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          participant_ranges: Json
          prize_distribution: Json
          tournament_type?: string | null
          updated_at?: string | null
        }
        Update: {
          calculation_method?: string | null
          config_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          participant_ranges?: Json
          prize_distribution?: Json
          tournament_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      promotion_analytics_daily: {
        Row: {
          avg_discount_per_redemption: number | null
          avg_order_value: number | null
          club_id: string
          conversion_rate: number | null
          created_at: string | null
          date: string
          day_of_week: number | null
          id: string
          is_weekend: boolean | null
          new_users: number | null
          promotion_id: string
          redemption_rate: number | null
          returning_users: number | null
          total_discount_given: number | null
          total_redemptions: number | null
          total_revenue_generated: number | null
          unique_users: number | null
          updated_at: string | null
        }
        Insert: {
          avg_discount_per_redemption?: number | null
          avg_order_value?: number | null
          club_id: string
          conversion_rate?: number | null
          created_at?: string | null
          date: string
          day_of_week?: number | null
          id?: string
          is_weekend?: boolean | null
          new_users?: number | null
          promotion_id: string
          redemption_rate?: number | null
          returning_users?: number | null
          total_discount_given?: number | null
          total_redemptions?: number | null
          total_revenue_generated?: number | null
          unique_users?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_discount_per_redemption?: number | null
          avg_order_value?: number | null
          club_id?: string
          conversion_rate?: number | null
          created_at?: string | null
          date?: string
          day_of_week?: number | null
          id?: string
          is_weekend?: boolean | null
          new_users?: number | null
          promotion_id?: string
          redemption_rate?: number | null
          returning_users?: number | null
          total_discount_given?: number | null
          total_redemptions?: number | null
          total_revenue_generated?: number | null
          unique_users?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotion_analytics_daily_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "promotion_analytics_daily_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_analytics_daily_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "promotion_analytics_daily_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "club_promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_analytics_summary: {
        Row: {
          avg_redemptions_per_day: number | null
          avg_redemptions_per_user: number | null
          club_id: string
          first_redemption_at: string | null
          id: string
          is_active: boolean | null
          last_calculated_at: string | null
          last_redemption_at: string | null
          net_profit: number | null
          peak_redemption_day: string | null
          peak_redemptions: number | null
          promotion_cost: number | null
          promotion_id: string
          revenue_attributed: number | null
          roi_percentage: number | null
          total_days_active: number | null
          total_discount_given: number | null
          total_redemptions: number | null
          total_revenue: number | null
          total_unique_users: number | null
          user_satisfaction_score: number | null
        }
        Insert: {
          avg_redemptions_per_day?: number | null
          avg_redemptions_per_user?: number | null
          club_id: string
          first_redemption_at?: string | null
          id?: string
          is_active?: boolean | null
          last_calculated_at?: string | null
          last_redemption_at?: string | null
          net_profit?: number | null
          peak_redemption_day?: string | null
          peak_redemptions?: number | null
          promotion_cost?: number | null
          promotion_id: string
          revenue_attributed?: number | null
          roi_percentage?: number | null
          total_days_active?: number | null
          total_discount_given?: number | null
          total_redemptions?: number | null
          total_revenue?: number | null
          total_unique_users?: number | null
          user_satisfaction_score?: number | null
        }
        Update: {
          avg_redemptions_per_day?: number | null
          avg_redemptions_per_user?: number | null
          club_id?: string
          first_redemption_at?: string | null
          id?: string
          is_active?: boolean | null
          last_calculated_at?: string | null
          last_redemption_at?: string | null
          net_profit?: number | null
          peak_redemption_day?: string | null
          peak_redemptions?: number | null
          promotion_cost?: number | null
          promotion_id?: string
          revenue_attributed?: number | null
          roi_percentage?: number | null
          total_days_active?: number | null
          total_discount_given?: number | null
          total_redemptions?: number | null
          total_revenue?: number | null
          total_unique_users?: number | null
          user_satisfaction_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "promotion_analytics_summary_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "promotion_analytics_summary_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_analytics_summary_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "promotion_analytics_summary_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: true
            referencedRelation: "club_promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_redemptions: {
        Row: {
          club_id: string | null
          discount_amount: number | null
          final_amount: number | null
          id: string
          metadata: Json | null
          original_amount: number | null
          payment_id: string | null
          promotion_id: string
          redeemed_at: string | null
          user_id: string
        }
        Insert: {
          club_id?: string | null
          discount_amount?: number | null
          final_amount?: number | null
          id?: string
          metadata?: Json | null
          original_amount?: number | null
          payment_id?: string | null
          promotion_id: string
          redeemed_at?: string | null
          user_id: string
        }
        Update: {
          club_id?: string | null
          discount_amount?: number | null
          final_amount?: number | null
          id?: string
          metadata?: Json | null
          original_amount?: number | null
          payment_id?: string | null
          promotion_id?: string
          redeemed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "promotion_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "promotion_redemptions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_redemptions_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "club_promotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "promotion_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rank_change_logs: {
        Row: {
          changed_by: string | null
          club_id: string | null
          created_at: string | null
          id: string
          new_rank: string | null
          old_rank: string | null
          reason: string | null
          user_id: string | null
        }
        Insert: {
          changed_by?: string | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          new_rank?: string | null
          old_rank?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          changed_by?: string | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          new_rank?: string | null
          old_rank?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rank_change_logs_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_change_logs_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "rank_change_logs_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_change_logs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "rank_change_logs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_change_logs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "rank_change_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_change_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "rank_change_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rank_requests: {
        Row: {
          club_id: string
          evidence_urls: string[] | null
          id: string
          notes: string | null
          rejection_reason: string | null
          requested_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Insert: {
          club_id: string
          evidence_urls?: string[] | null
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Update: {
          club_id?: string
          evidence_urls?: string[] | null
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rank_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "rank_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "rank_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "rank_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "rank_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rank_system: {
        Row: {
          color_hex: string
          created_at: string | null
          elo_max: number | null
          elo_min: number | null
          id: string
          rank_code: string
          rank_name: string
          rank_name_vi: string
          rank_value: number
        }
        Insert: {
          color_hex: string
          created_at?: string | null
          elo_max?: number | null
          elo_min?: number | null
          id?: string
          rank_code: string
          rank_name: string
          rank_name_vi: string
          rank_value: number
        }
        Update: {
          color_hex?: string
          created_at?: string | null
          elo_max?: number | null
          elo_min?: number | null
          id?: string
          rank_code?: string
          rank_name?: string
          rank_name_vi?: string
          rank_value?: number
        }
        Relationships: []
      }
      ranking_definitions: {
        Row: {
          benefits: Json | null
          color_code: string | null
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          max_elo: number | null
          min_elo: number
          rank_level: number
          rank_name: string
          requirements: Json | null
          updated_at: string | null
        }
        Insert: {
          benefits?: Json | null
          color_code?: string | null
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          max_elo?: number | null
          min_elo: number
          rank_level: number
          rank_name: string
          requirements?: Json | null
          updated_at?: string | null
        }
        Update: {
          benefits?: Json | null
          color_code?: string | null
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          max_elo?: number | null
          min_elo?: number
          rank_level?: number
          rank_name?: string
          requirements?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          code_type: string | null
          created_at: string | null
          current_uses: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          rewards: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          code: string
          code_type?: string | null
          created_at?: string | null
          current_uses?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          rewards?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          code?: string
          code_type?: string | null
          created_at?: string | null
          current_uses?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          rewards?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "referral_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_usage: {
        Row: {
          bonus_awarded: Json
          id: string
          referral_code_id: string | null
          referred_user_id: string | null
          referrer_id: string | null
          status: string | null
          used_at: string | null
        }
        Insert: {
          bonus_awarded: Json
          id?: string
          referral_code_id?: string | null
          referred_user_id?: string | null
          referrer_id?: string | null
          status?: string | null
          used_at?: string | null
        }
        Update: {
          bonus_awarded?: Json
          id?: string
          referral_code_id?: string | null
          referred_user_id?: string | null
          referrer_id?: string | null
          status?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_usage_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_usage_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_usage_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "referral_usage_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_usage_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_usage_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "referral_usage_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      refund_requests: {
        Row: {
          additional_notes: string | null
          amount: number
          cancelled_at: string | null
          created_at: string | null
          id: string
          reason: string
          rejection_reason: string | null
          requested_at: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          tournament_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          amount: number
          cancelled_at?: string | null
          created_at?: string | null
          id?: string
          reason: string
          rejection_reason?: string | null
          requested_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          amount?: number
          cancelled_at?: string | null
          created_at?: string | null
          id?: string
          reason?: string
          rejection_reason?: string | null
          requested_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "refund_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "refund_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_requests_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_requests_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "refund_requests_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "refund_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "refund_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_posts: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "saved_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_notifications: {
        Row: {
          created_at: string | null
          created_by: string | null
          data: Json | null
          failed_count: number | null
          id: string
          message: string
          scheduled_at: string
          sent_at: string | null
          sent_count: number | null
          status: string | null
          target_audience: string
          target_user_ids: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          failed_count?: number | null
          id?: string
          message: string
          scheduled_at: string
          sent_at?: string | null
          sent_count?: number | null
          status?: string | null
          target_audience: string
          target_user_ids?: string[] | null
          title: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          failed_count?: number | null
          id?: string
          message?: string
          scheduled_at?: string
          sent_at?: string | null
          sent_count?: number | null
          status?: string | null
          target_audience?: string
          target_user_ids?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "scheduled_notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      share_analytics: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          event_type: string
          id: string
          referral_code: string | null
          share_destination: string | null
          share_method: string
          user_id: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          event_type: string
          id?: string
          referral_code?: string | null
          share_destination?: string | null
          share_method: string
          user_id?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          event_type?: string
          id?: string
          referral_code?: string | null
          share_destination?: string | null
          share_method?: string
          user_id?: string | null
        }
        Relationships: []
      }
      share_performance: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          error_message: string | null
          id: string
          image_size_bytes: number
          processing_time_ms: number
          was_successful: boolean | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          image_size_bytes: number
          processing_time_ms: number
          was_successful?: boolean | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          image_size_bytes?: number
          processing_time_ms?: number
          was_successful?: boolean | null
        }
        Relationships: []
      }
      shift_expenses: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          club_id: string | null
          created_at: string | null
          description: string
          expense_type: string
          id: string
          payment_method: string
          receipt_url: string | null
          recorded_at: string | null
          recorded_by: string | null
          shift_session_id: string | null
          vendor_name: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          club_id?: string | null
          created_at?: string | null
          description: string
          expense_type: string
          id?: string
          payment_method: string
          receipt_url?: string | null
          recorded_at?: string | null
          recorded_by?: string | null
          shift_session_id?: string | null
          vendor_name?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          club_id?: string | null
          created_at?: string | null
          description?: string
          expense_type?: string
          id?: string
          payment_method?: string
          receipt_url?: string | null
          recorded_at?: string | null
          recorded_by?: string | null
          shift_session_id?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_expenses_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_expenses_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_expenses_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_expenses_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_expenses_shift_session_id_fkey"
            columns: ["shift_session_id"]
            isOneToOne: false
            referencedRelation: "shift_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_inventory: {
        Row: {
          category: string
          closing_stock: number | null
          club_id: string | null
          created_at: string | null
          id: string
          item_name: string
          notes: string | null
          opening_stock: number | null
          revenue_generated: number | null
          shift_session_id: string | null
          stock_added: number | null
          stock_used: number | null
          stock_wasted: number | null
          total_sold: number | null
          unit: string
          unit_cost: number | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          closing_stock?: number | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          item_name: string
          notes?: string | null
          opening_stock?: number | null
          revenue_generated?: number | null
          shift_session_id?: string | null
          stock_added?: number | null
          stock_used?: number | null
          stock_wasted?: number | null
          total_sold?: number | null
          unit: string
          unit_cost?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          closing_stock?: number | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          item_name?: string
          notes?: string | null
          opening_stock?: number | null
          revenue_generated?: number | null
          shift_session_id?: string | null
          stock_added?: number | null
          stock_used?: number | null
          stock_wasted?: number | null
          total_sold?: number | null
          unit?: string
          unit_cost?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_inventory_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_inventory_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_inventory_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_inventory_shift_session_id_fkey"
            columns: ["shift_session_id"]
            isOneToOne: false
            referencedRelation: "shift_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_reports: {
        Row: {
          average_revenue_per_table: number | null
          cash_actual: number | null
          cash_expected: number | null
          cash_variance: number | null
          club_id: string | null
          created_at: string | null
          customer_count: number | null
          expense_summary: Json | null
          id: string
          inventory_summary: Json | null
          manager_notes: string | null
          net_profit: number | null
          revenue_summary: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          shift_session_id: string | null
          status: string | null
          tables_served: number | null
          total_expenses: number | null
          total_revenue: number | null
          updated_at: string | null
        }
        Insert: {
          average_revenue_per_table?: number | null
          cash_actual?: number | null
          cash_expected?: number | null
          cash_variance?: number | null
          club_id?: string | null
          created_at?: string | null
          customer_count?: number | null
          expense_summary?: Json | null
          id?: string
          inventory_summary?: Json | null
          manager_notes?: string | null
          net_profit?: number | null
          revenue_summary?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          shift_session_id?: string | null
          status?: string | null
          tables_served?: number | null
          total_expenses?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          average_revenue_per_table?: number | null
          cash_actual?: number | null
          cash_expected?: number | null
          cash_variance?: number | null
          club_id?: string | null
          created_at?: string | null
          customer_count?: number | null
          expense_summary?: Json | null
          id?: string
          inventory_summary?: Json | null
          manager_notes?: string | null
          net_profit?: number | null
          revenue_summary?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          shift_session_id?: string | null
          status?: string | null
          tables_served?: number | null
          total_expenses?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_reports_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_reports_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_reports_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_reports_shift_session_id_fkey"
            columns: ["shift_session_id"]
            isOneToOne: false
            referencedRelation: "shift_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_sessions: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          card_revenue: number | null
          cash_difference: number | null
          cash_revenue: number | null
          closing_cash: number | null
          club_id: string | null
          created_at: string | null
          digital_revenue: number | null
          end_time: string | null
          expected_cash: number | null
          handed_over_at: string | null
          handed_over_to: string | null
          handover_notes: string | null
          id: string
          notes: string | null
          opening_cash: number | null
          shift_date: string
          staff_id: string | null
          start_time: string
          status: string | null
          total_revenue: number | null
          updated_at: string | null
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          card_revenue?: number | null
          cash_difference?: number | null
          cash_revenue?: number | null
          closing_cash?: number | null
          club_id?: string | null
          created_at?: string | null
          digital_revenue?: number | null
          end_time?: string | null
          expected_cash?: number | null
          handed_over_at?: string | null
          handed_over_to?: string | null
          handover_notes?: string | null
          id?: string
          notes?: string | null
          opening_cash?: number | null
          shift_date: string
          staff_id?: string | null
          start_time: string
          status?: string | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          card_revenue?: number | null
          cash_difference?: number | null
          cash_revenue?: number | null
          closing_cash?: number | null
          club_id?: string | null
          created_at?: string | null
          digital_revenue?: number | null
          end_time?: string | null
          expected_cash?: number | null
          handed_over_at?: string | null
          handed_over_to?: string | null
          handover_notes?: string | null
          id?: string
          notes?: string | null
          opening_cash?: number | null
          shift_date?: string
          staff_id?: string | null
          start_time?: string
          status?: string | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_sessions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_sessions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_sessions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_sessions_handed_over_to_fkey"
            columns: ["handed_over_to"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_sessions_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_transactions: {
        Row: {
          amount: number
          category: string
          club_id: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          id: string
          payment_method: string
          receipt_number: string | null
          recorded_at: string | null
          recorded_by: string | null
          shift_session_id: string | null
          table_number: number | null
          transaction_type: string
        }
        Insert: {
          amount: number
          category: string
          club_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          id?: string
          payment_method: string
          receipt_number?: string | null
          recorded_at?: string | null
          recorded_by?: string | null
          shift_session_id?: string | null
          table_number?: number | null
          transaction_type: string
        }
        Update: {
          amount?: number
          category?: string
          club_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string
          id?: string
          payment_method?: string
          receipt_number?: string | null
          recorded_at?: string | null
          recorded_by?: string | null
          shift_session_id?: string | null
          table_number?: number | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "shift_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "shift_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_transactions_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_transactions_shift_session_id_fkey"
            columns: ["shift_session_id"]
            isOneToOne: false
            referencedRelation: "shift_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      spa_reward_redemptions: {
        Row: {
          claimed_at: string | null
          club_id: string | null
          expires_at: string | null
          id: string
          metadata: Json | null
          redeemed_at: string | null
          reward_id: string
          spa_spent: number
          status: string | null
          user_id: string
          voucher_code: string | null
        }
        Insert: {
          claimed_at?: string | null
          club_id?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          redeemed_at?: string | null
          reward_id: string
          spa_spent: number
          status?: string | null
          user_id: string
          voucher_code?: string | null
        }
        Update: {
          claimed_at?: string | null
          club_id?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          redeemed_at?: string | null
          reward_id?: string
          spa_spent?: number
          status?: string | null
          user_id?: string
          voucher_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spa_reward_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "spa_reward_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spa_reward_redemptions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "spa_reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "spa_rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spa_reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spa_reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "spa_reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spa_rewards: {
        Row: {
          available_quantity: number | null
          cash_value: number | null
          club_id: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          metadata: Json | null
          reward_name: string
          reward_type: string
          spa_cost: number
          stock_quantity: number | null
          terms: string | null
          updated_at: string | null
          valid_days: number | null
        }
        Insert: {
          available_quantity?: number | null
          cash_value?: number | null
          club_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          reward_name: string
          reward_type: string
          spa_cost: number
          stock_quantity?: number | null
          terms?: string | null
          updated_at?: string | null
          valid_days?: number | null
        }
        Update: {
          available_quantity?: number | null
          cash_value?: number | null
          club_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          metadata?: Json | null
          reward_name?: string
          reward_type?: string
          spa_cost?: number
          stock_quantity?: number | null
          terms?: string | null
          updated_at?: string | null
          valid_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "spa_rewards_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "spa_rewards_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spa_rewards_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      spa_transactions: {
        Row: {
          amount: number
          balance_after: number
          balance_before: number
          club_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          match_id: string | null
          reference_id: string | null
          reference_type: string | null
          spa_amount: number | null
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          balance_after: number
          balance_before: number
          club_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          match_id?: string | null
          reference_id?: string | null
          reference_type?: string | null
          spa_amount?: number | null
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          balance_after?: number
          balance_before?: number
          club_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          match_id?: string | null
          reference_id?: string | null
          reference_type?: string | null
          spa_amount?: number | null
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spa_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "spa_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spa_transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "spa_transactions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spa_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spa_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "spa_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      staff_attendance: {
        Row: {
          attendance_status: string | null
          check_in_device_info: Json | null
          check_in_location: unknown
          check_in_method: string | null
          check_in_time: string
          check_out_device_info: Json | null
          check_out_location: unknown
          check_out_method: string | null
          check_out_time: string | null
          club_id: string
          created_at: string | null
          early_departure_minutes: number | null
          id: string
          late_minutes: number | null
          shift_id: string
          staff_id: string
          total_hours_worked: number | null
          updated_at: string | null
        }
        Insert: {
          attendance_status?: string | null
          check_in_device_info?: Json | null
          check_in_location?: unknown
          check_in_method?: string | null
          check_in_time?: string
          check_out_device_info?: Json | null
          check_out_location?: unknown
          check_out_method?: string | null
          check_out_time?: string | null
          club_id: string
          created_at?: string | null
          early_departure_minutes?: number | null
          id?: string
          late_minutes?: number | null
          shift_id: string
          staff_id: string
          total_hours_worked?: number | null
          updated_at?: string | null
        }
        Update: {
          attendance_status?: string | null
          check_in_device_info?: Json | null
          check_in_location?: unknown
          check_in_method?: string | null
          check_in_time?: string
          check_out_device_info?: Json | null
          check_out_location?: unknown
          check_out_method?: string | null
          check_out_time?: string | null
          club_id?: string
          created_at?: string | null
          early_departure_minutes?: number | null
          id?: string
          late_minutes?: number | null
          shift_id?: string
          staff_id?: string
          total_hours_worked?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_attendance_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_attendance_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_attendance_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_attendance_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "staff_shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_attendance_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_breaks: {
        Row: {
          attendance_id: string
          break_duration_minutes: number | null
          break_end: string | null
          break_reason: string | null
          break_start: string
          break_type: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          attendance_id: string
          break_duration_minutes?: number | null
          break_end?: string | null
          break_reason?: string | null
          break_start?: string
          break_type?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          attendance_id?: string
          break_duration_minutes?: number | null
          break_end?: string | null
          break_reason?: string | null
          break_start?: string
          break_type?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_breaks_attendance_id_fkey"
            columns: ["attendance_id"]
            isOneToOne: false
            referencedRelation: "staff_attendance"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_commissions: {
        Row: {
          club_id: string
          commission_amount: number
          commission_rate: number
          commission_type: string
          created_at: string | null
          customer_transaction_id: string
          earned_at: string | null
          id: string
          is_paid: boolean | null
          paid_at: string | null
          payment_method: string | null
          payment_notes: string | null
          payment_reference: string | null
          staff_id: string
          transaction_amount: number
        }
        Insert: {
          club_id: string
          commission_amount: number
          commission_rate: number
          commission_type: string
          created_at?: string | null
          customer_transaction_id: string
          earned_at?: string | null
          id?: string
          is_paid?: boolean | null
          paid_at?: string | null
          payment_method?: string | null
          payment_notes?: string | null
          payment_reference?: string | null
          staff_id: string
          transaction_amount: number
        }
        Update: {
          club_id?: string
          commission_amount?: number
          commission_rate?: number
          commission_type?: string
          created_at?: string | null
          customer_transaction_id?: string
          earned_at?: string | null
          id?: string
          is_paid?: boolean | null
          paid_at?: string | null
          payment_method?: string | null
          payment_notes?: string | null
          payment_reference?: string | null
          staff_id?: string
          transaction_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "staff_commissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_commissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_commissions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_commissions_customer_transaction_id_fkey"
            columns: ["customer_transaction_id"]
            isOneToOne: false
            referencedRelation: "customer_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_commissions_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_performance: {
        Row: {
          active_customers: number | null
          avg_transaction_value: number | null
          club_id: string
          created_at: string | null
          id: string
          performance_score: number | null
          period_end: string
          period_start: string
          staff_id: string
          total_commissions_earned: number | null
          total_referrals: number | null
          total_revenue_generated: number | null
          total_transactions: number | null
          updated_at: string | null
        }
        Insert: {
          active_customers?: number | null
          avg_transaction_value?: number | null
          club_id: string
          created_at?: string | null
          id?: string
          performance_score?: number | null
          period_end: string
          period_start: string
          staff_id: string
          total_commissions_earned?: number | null
          total_referrals?: number | null
          total_revenue_generated?: number | null
          total_transactions?: number | null
          updated_at?: string | null
        }
        Update: {
          active_customers?: number | null
          avg_transaction_value?: number | null
          club_id?: string
          created_at?: string | null
          id?: string
          performance_score?: number | null
          period_end?: string
          period_start?: string
          staff_id?: string
          total_commissions_earned?: number | null
          total_referrals?: number | null
          total_revenue_generated?: number | null
          total_transactions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_performance_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_performance_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_performance_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_performance_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_referrals: {
        Row: {
          club_id: string
          commission_rate: number | null
          created_at: string | null
          customer_id: string
          id: string
          initial_bonus_spa: number | null
          is_active: boolean | null
          notes: string | null
          referral_code: string | null
          referral_method: string | null
          referred_at: string | null
          staff_id: string
          total_commission_earned: number | null
          total_customer_spending: number | null
          updated_at: string | null
        }
        Insert: {
          club_id: string
          commission_rate?: number | null
          created_at?: string | null
          customer_id: string
          id?: string
          initial_bonus_spa?: number | null
          is_active?: boolean | null
          notes?: string | null
          referral_code?: string | null
          referral_method?: string | null
          referred_at?: string | null
          staff_id: string
          total_commission_earned?: number | null
          total_customer_spending?: number | null
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          commission_rate?: number | null
          created_at?: string | null
          customer_id?: string
          id?: string
          initial_bonus_spa?: number | null
          is_active?: boolean | null
          notes?: string | null
          referral_code?: string | null
          referral_method?: string | null
          referred_at?: string | null
          staff_id?: string
          total_commission_earned?: number | null
          total_customer_spending?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_referrals_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_referrals_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_referrals_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_referrals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_referrals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "staff_referrals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_referrals_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_shifts: {
        Row: {
          club_id: string
          created_at: string | null
          created_by: string | null
          id: string
          overtime_hours: number | null
          scheduled_end_time: string
          scheduled_start_time: string
          shift_date: string
          shift_status: string | null
          staff_id: string
          total_scheduled_hours: number | null
          updated_at: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          overtime_hours?: number | null
          scheduled_end_time: string
          scheduled_start_time: string
          shift_date: string
          shift_status?: string | null
          staff_id: string
          total_scheduled_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          overtime_hours?: number | null
          scheduled_end_time?: string
          scheduled_start_time?: string
          shift_date?: string
          shift_status?: string | null
          staff_id?: string
          total_scheduled_hours?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_shifts_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_shifts_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_shifts_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_shifts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_shifts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "staff_shifts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_shifts_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_tasks: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          assigned_to: string
          assignment_notes: string | null
          club_id: string
          completed_at: string | null
          completion_notes: string | null
          completion_percentage: number | null
          created_at: string | null
          description: string
          due_at: string | null
          id: string
          priority: string | null
          required_location: Json | null
          started_at: string | null
          status: string | null
          task_name: string
          task_type: string
          template_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_to: string
          assignment_notes?: string | null
          club_id: string
          completed_at?: string | null
          completion_notes?: string | null
          completion_percentage?: number | null
          created_at?: string | null
          description: string
          due_at?: string | null
          id?: string
          priority?: string | null
          required_location?: Json | null
          started_at?: string | null
          status?: string | null
          task_name: string
          task_type: string
          template_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          assigned_to?: string
          assignment_notes?: string | null
          club_id?: string
          completed_at?: string | null
          completion_notes?: string | null
          completion_percentage?: number | null
          created_at?: string | null
          description?: string
          due_at?: string | null
          id?: string
          priority?: string | null
          required_location?: Json | null
          started_at?: string | null
          status?: string | null
          task_name?: string
          task_type?: string
          template_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_tasks_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_tasks_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_tasks_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "staff_tasks_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "task_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      table_availability: {
        Row: {
          club_id: string
          created_at: string
          date: string
          id: string
          is_available: boolean | null
          reason: string | null
          table_number: number
          time_slot: string
          updated_at: string
        }
        Insert: {
          club_id: string
          created_at?: string
          date: string
          id?: string
          is_available?: boolean | null
          reason?: string | null
          table_number: number
          time_slot: string
          updated_at?: string
        }
        Update: {
          club_id?: string
          created_at?: string
          date?: string
          id?: string
          is_available?: boolean | null
          reason?: string | null
          table_number?: number
          time_slot?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "table_availability_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "table_availability_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_availability_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      table_reservations: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          club_id: string
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string
          deposit_amount: number | null
          duration_hours: number
          end_time: string
          id: string
          match_id: string | null
          notes: string | null
          number_of_players: number | null
          payment_method: string | null
          payment_status: string
          payment_transaction_id: string | null
          price_per_hour: number
          special_requests: string | null
          start_time: string
          status: string
          table_number: number
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          club_id: string
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          deposit_amount?: number | null
          duration_hours: number
          end_time: string
          id?: string
          match_id?: string | null
          notes?: string | null
          number_of_players?: number | null
          payment_method?: string | null
          payment_status?: string
          payment_transaction_id?: string | null
          price_per_hour: number
          special_requests?: string | null
          start_time: string
          status?: string
          table_number: number
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          club_id?: string
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          deposit_amount?: number | null
          duration_hours?: number
          end_time?: string
          id?: string
          match_id?: string | null
          notes?: string | null
          number_of_players?: number | null
          payment_method?: string | null
          payment_status?: string
          payment_transaction_id?: string | null
          price_per_hour?: number
          special_requests?: string | null
          start_time?: string
          status?: string
          table_number?: number
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "table_reservations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "table_reservations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_reservations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "table_reservations_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      table_voucher_payments: {
        Row: {
          club_id: string
          created_at: string | null
          duration_hours: number | null
          final_amount: number
          id: string
          original_amount: number
          paid_at: string | null
          payment_status: string | null
          remaining_payment_method: string | null
          reservation_id: string | null
          session_end_time: string | null
          session_start_time: string
          table_number: number
          updated_at: string | null
          user_id: string
          voucher_code: string
          voucher_discount: number
          voucher_id: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          duration_hours?: number | null
          final_amount: number
          id?: string
          original_amount: number
          paid_at?: string | null
          payment_status?: string | null
          remaining_payment_method?: string | null
          reservation_id?: string | null
          session_end_time?: string | null
          session_start_time: string
          table_number: number
          updated_at?: string | null
          user_id: string
          voucher_code: string
          voucher_discount: number
          voucher_id?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          duration_hours?: number | null
          final_amount?: number
          id?: string
          original_amount?: number
          paid_at?: string | null
          payment_status?: string | null
          remaining_payment_method?: string | null
          reservation_id?: string | null
          session_end_time?: string | null
          session_start_time?: string
          table_number?: number
          updated_at?: string | null
          user_id?: string
          voucher_code?: string
          voucher_discount?: number
          voucher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "table_voucher_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "table_voucher_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_voucher_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "table_voucher_payments_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "user_vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      task_templates: {
        Row: {
          club_id: string
          created_at: string | null
          deadline_hours: number | null
          description: string
          estimated_duration: number | null
          id: string
          instructions: Json | null
          is_active: boolean | null
          requires_location: boolean | null
          requires_photo: boolean | null
          requires_timestamp: boolean | null
          task_name: string
          task_type: string
          updated_at: string | null
          verification_notes: string | null
        }
        Insert: {
          club_id: string
          created_at?: string | null
          deadline_hours?: number | null
          description: string
          estimated_duration?: number | null
          id?: string
          instructions?: Json | null
          is_active?: boolean | null
          requires_location?: boolean | null
          requires_photo?: boolean | null
          requires_timestamp?: boolean | null
          task_name: string
          task_type: string
          updated_at?: string | null
          verification_notes?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string | null
          deadline_hours?: number | null
          description?: string
          estimated_duration?: number | null
          id?: string
          instructions?: Json | null
          is_active?: boolean | null
          requires_location?: boolean | null
          requires_photo?: boolean | null
          requires_timestamp?: boolean | null
          task_name?: string
          task_type?: string
          updated_at?: string | null
          verification_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_templates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "task_templates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_templates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      task_verifications: {
        Row: {
          auto_verification_score: number | null
          camera_metadata: Json | null
          captured_at: string
          captured_latitude: number | null
          captured_longitude: number | null
          club_id: string
          confidence_score: number | null
          created_at: string | null
          device_info: Json | null
          distance_from_required: number | null
          fraud_flags: Json | null
          id: string
          location_accuracy: number | null
          location_verified: boolean | null
          manual_review_required: boolean | null
          photo_hash: string
          photo_mime_type: string | null
          photo_size: number | null
          photo_url: string
          rejection_reason: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          server_received_at: string | null
          staff_id: string
          task_id: string
          time_drift_seconds: number | null
          timestamp_verified: boolean | null
          updated_at: string | null
          verification_status: string | null
        }
        Insert: {
          auto_verification_score?: number | null
          camera_metadata?: Json | null
          captured_at: string
          captured_latitude?: number | null
          captured_longitude?: number | null
          club_id: string
          confidence_score?: number | null
          created_at?: string | null
          device_info?: Json | null
          distance_from_required?: number | null
          fraud_flags?: Json | null
          id?: string
          location_accuracy?: number | null
          location_verified?: boolean | null
          manual_review_required?: boolean | null
          photo_hash: string
          photo_mime_type?: string | null
          photo_size?: number | null
          photo_url: string
          rejection_reason?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          server_received_at?: string | null
          staff_id: string
          task_id: string
          time_drift_seconds?: number | null
          timestamp_verified?: boolean | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Update: {
          auto_verification_score?: number | null
          camera_metadata?: Json | null
          captured_at?: string
          captured_latitude?: number | null
          captured_longitude?: number | null
          club_id?: string
          confidence_score?: number | null
          created_at?: string | null
          device_info?: Json | null
          distance_from_required?: number | null
          fraud_flags?: Json | null
          id?: string
          location_accuracy?: number | null
          location_verified?: boolean | null
          manual_review_required?: boolean | null
          photo_hash?: string
          photo_mime_type?: string | null
          photo_size?: number | null
          photo_url?: string
          rejection_reason?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          server_received_at?: string | null
          staff_id?: string
          task_id?: string
          time_drift_seconds?: number | null
          timestamp_verified?: boolean | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_verifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "task_verifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_verifications_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "task_verifications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_verifications_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_verifications_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "staff_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_completion_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          error_type: string | null
          id: string
          tournament_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: string
          tournament_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: string
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_completion_logs_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_completion_logs_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "tournament_completion_logs_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_elo_logs: {
        Row: {
          created_at: string | null
          elo_change: number
          id: string
          match_id: string | null
          metadata: Json | null
          new_elo: number
          old_elo: number
          opponent_elo: number | null
          opponent_id: string | null
          result: string | null
          tournament_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          elo_change: number
          id?: string
          match_id?: string | null
          metadata?: Json | null
          new_elo: number
          old_elo: number
          opponent_elo?: number | null
          opponent_id?: string | null
          result?: string | null
          tournament_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          elo_change?: number
          id?: string
          match_id?: string | null
          metadata?: Json | null
          new_elo?: number
          old_elo?: number
          opponent_elo?: number | null
          opponent_id?: string | null
          result?: string | null
          tournament_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_elo_logs_opponent_id_fkey"
            columns: ["opponent_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_elo_logs_opponent_id_fkey"
            columns: ["opponent_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tournament_elo_logs_opponent_id_fkey"
            columns: ["opponent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_elo_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_elo_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tournament_elo_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_formats: {
        Row: {
          created_at: string | null
          description: string | null
          format_name: string
          format_type: string
          id: string
          is_active: boolean | null
          max_participants: number | null
          min_participants: number | null
          rules: Json | null
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          format_name: string
          format_type: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          min_participants?: number | null
          rules?: Json | null
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          format_name?: string
          format_type?: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          min_participants?: number | null
          rules?: Json | null
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tournament_participants: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          payment_method_id: string | null
          payment_status: string | null
          registered_at: string | null
          seed_number: number | null
          status: string | null
          tournament_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          registered_at?: string | null
          seed_number?: number | null
          status?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          registered_at?: string | null
          seed_number?: number | null
          status?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_participants_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tournament_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_payments: {
        Row: {
          amount: number
          club_id: string | null
          created_at: string | null
          currency: string | null
          due_date: string | null
          id: string
          metadata: Json | null
          notes: string | null
          paid_at: string | null
          payment_id: string | null
          payment_method: string | null
          payment_type: string
          prize_position: number | null
          prize_type: string | null
          receipt_image_url: string | null
          receipt_url: string | null
          refund_reason: string | null
          refund_transaction_id: string | null
          refunded_at: string | null
          registration_id: string | null
          status: string
          tournament_id: string
          transaction_reference: string | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          amount: number
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_type: string
          prize_position?: number | null
          prize_type?: string | null
          receipt_image_url?: string | null
          receipt_url?: string | null
          refund_reason?: string | null
          refund_transaction_id?: string | null
          refunded_at?: string | null
          registration_id?: string | null
          status?: string
          tournament_id: string
          transaction_reference?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          amount?: number
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          paid_at?: string | null
          payment_id?: string | null
          payment_method?: string | null
          payment_type?: string
          prize_position?: number | null
          prize_type?: string | null
          receipt_image_url?: string | null
          receipt_url?: string | null
          refund_reason?: string | null
          refund_transaction_id?: string | null
          refunded_at?: string | null
          registration_id?: string | null
          status?: string
          tournament_id?: string
          transaction_reference?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournament_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_payments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournament_payments_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tournament_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_payments_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_payments_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tournament_payments_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_post_settings: {
        Row: {
          auto_pin_posts: boolean | null
          auto_post_enabled: boolean | null
          club_id: string | null
          created_at: string | null
          enable_live_stream: boolean | null
          id: string
          include_player_stats: boolean | null
          include_tournament_info: boolean | null
          post_all_rounds: boolean | null
          post_cross_finals: boolean | null
          post_finals: boolean | null
          post_semifinals: boolean | null
          post_third_place: boolean | null
          reminder_minutes_before: number | null
          send_reminder: boolean | null
          tournament_id: string | null
          updated_at: string | null
        }
        Insert: {
          auto_pin_posts?: boolean | null
          auto_post_enabled?: boolean | null
          club_id?: string | null
          created_at?: string | null
          enable_live_stream?: boolean | null
          id?: string
          include_player_stats?: boolean | null
          include_tournament_info?: boolean | null
          post_all_rounds?: boolean | null
          post_cross_finals?: boolean | null
          post_finals?: boolean | null
          post_semifinals?: boolean | null
          post_third_place?: boolean | null
          reminder_minutes_before?: number | null
          send_reminder?: boolean | null
          tournament_id?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_pin_posts?: boolean | null
          auto_post_enabled?: boolean | null
          club_id?: string | null
          created_at?: string | null
          enable_live_stream?: boolean | null
          id?: string
          include_player_stats?: boolean | null
          include_tournament_info?: boolean | null
          post_all_rounds?: boolean | null
          post_cross_finals?: boolean | null
          post_finals?: boolean | null
          post_semifinals?: boolean | null
          post_third_place?: boolean | null
          reminder_minutes_before?: number | null
          send_reminder?: boolean | null
          tournament_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_post_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournament_post_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_post_settings_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournament_post_settings_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: true
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_post_settings_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: true
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "tournament_post_settings_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: true
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_prize_vouchers: {
        Row: {
          created_at: string | null
          id: string
          is_issued: boolean | null
          issued_at: string | null
          issued_by: string | null
          position: number
          position_label: string | null
          tournament_id: string | null
          updated_at: string | null
          valid_days: number | null
          voucher_code_prefix: string | null
          voucher_description: string | null
          voucher_value: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_issued?: boolean | null
          issued_at?: string | null
          issued_by?: string | null
          position: number
          position_label?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          valid_days?: number | null
          voucher_code_prefix?: string | null
          voucher_description?: string | null
          voucher_value: number
        }
        Update: {
          created_at?: string | null
          id?: string
          is_issued?: boolean | null
          issued_at?: string | null
          issued_by?: string | null
          position?: number
          position_label?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          valid_days?: number | null
          voucher_code_prefix?: string | null
          voucher_description?: string | null
          voucher_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "tournament_prize_vouchers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_prize_vouchers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "tournament_prize_vouchers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_results: {
        Row: {
          created_at: string | null
          games_lost: number | null
          games_won: number | null
          id: string
          matches_lost: number | null
          matches_played: number | null
          matches_won: number | null
          participant_id: string | null
          participant_name: string
          points: number | null
          position: number
          tournament_id: string | null
          updated_at: string | null
          win_percentage: number | null
        }
        Insert: {
          created_at?: string | null
          games_lost?: number | null
          games_won?: number | null
          id?: string
          matches_lost?: number | null
          matches_played?: number | null
          matches_won?: number | null
          participant_id?: string | null
          participant_name: string
          points?: number | null
          position: number
          tournament_id?: string | null
          updated_at?: string | null
          win_percentage?: number | null
        }
        Update: {
          created_at?: string | null
          games_lost?: number | null
          games_won?: number | null
          id?: string
          matches_lost?: number | null
          matches_played?: number | null
          matches_won?: number | null
          participant_id?: string | null
          participant_name?: string
          points?: number | null
          position?: number
          tournament_id?: string | null
          updated_at?: string | null
          win_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tournament_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_results_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_results_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "tournament_results_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_templates: {
        Row: {
          club_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          entry_fee: number | null
          game_type: string | null
          id: string
          is_public: boolean | null
          max_participants: number | null
          prize_pool_structure: Json | null
          rules: Json | null
          settings: Json | null
          template_name: string
          tournament_format: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          club_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entry_fee?: number | null
          game_type?: string | null
          id?: string
          is_public?: boolean | null
          max_participants?: number | null
          prize_pool_structure?: Json | null
          rules?: Json | null
          settings?: Json | null
          template_name: string
          tournament_format: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          club_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          entry_fee?: number | null
          game_type?: string | null
          id?: string
          is_public?: boolean | null
          max_participants?: number | null
          prize_pool_structure?: Json | null
          rules?: Json | null
          settings?: Json | null
          template_name?: string
          tournament_format?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_templates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournament_templates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_templates_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournament_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tournament_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          bracket_format: string | null
          club_id: string | null
          cover_image: string | null
          cover_image_url: string | null
          created_at: string | null
          current_participants: number | null
          custom_distribution: Json | null
          description: string | null
          distribution_template: string | null
          end_date: string | null
          entry_fee: number | null
          game_format: string | null
          has_live_stream: boolean | null
          id: string
          is_public: boolean | null
          max_participants: number
          max_rank: string | null
          min_rank: string | null
          organizer_fee_percent: number | null
          organizer_id: string | null
          prize_distribution: Json | null
          prize_pool: number | null
          prize_source: string | null
          registration_deadline: string
          registration_end_time: string | null
          registration_fee_waiver: boolean | null
          requirements: string | null
          rules: string | null
          skill_level_required:
            | Database["public"]["Enums"]["skill_level"]
            | null
          special_rules: string | null
          sponsor_contribution: number | null
          start_date: string
          status: Database["public"]["Enums"]["tournament_status"] | null
          title: string
          updated_at: string | null
          venue_address: string | null
          venue_contact: string | null
          venue_phone: string | null
        }
        Insert: {
          bracket_format?: string | null
          club_id?: string | null
          cover_image?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          current_participants?: number | null
          custom_distribution?: Json | null
          description?: string | null
          distribution_template?: string | null
          end_date?: string | null
          entry_fee?: number | null
          game_format?: string | null
          has_live_stream?: boolean | null
          id?: string
          is_public?: boolean | null
          max_participants: number
          max_rank?: string | null
          min_rank?: string | null
          organizer_fee_percent?: number | null
          organizer_id?: string | null
          prize_distribution?: Json | null
          prize_pool?: number | null
          prize_source?: string | null
          registration_deadline: string
          registration_end_time?: string | null
          registration_fee_waiver?: boolean | null
          requirements?: string | null
          rules?: string | null
          skill_level_required?:
            | Database["public"]["Enums"]["skill_level"]
            | null
          special_rules?: string | null
          sponsor_contribution?: number | null
          start_date: string
          status?: Database["public"]["Enums"]["tournament_status"] | null
          title: string
          updated_at?: string | null
          venue_address?: string | null
          venue_contact?: string | null
          venue_phone?: string | null
        }
        Update: {
          bracket_format?: string | null
          club_id?: string | null
          cover_image?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          current_participants?: number | null
          custom_distribution?: Json | null
          description?: string | null
          distribution_template?: string | null
          end_date?: string | null
          entry_fee?: number | null
          game_format?: string | null
          has_live_stream?: boolean | null
          id?: string
          is_public?: boolean | null
          max_participants?: number
          max_rank?: string | null
          min_rank?: string | null
          organizer_fee_percent?: number | null
          organizer_id?: string | null
          prize_distribution?: Json | null
          prize_pool?: number | null
          prize_source?: string | null
          registration_deadline?: string
          registration_end_time?: string | null
          registration_fee_waiver?: boolean | null
          requirements?: string | null
          rules?: string | null
          skill_level_required?:
            | Database["public"]["Enums"]["skill_level"]
            | null
          special_rules?: string | null
          sponsor_contribution?: number | null
          start_date?: string
          status?: Database["public"]["Enums"]["tournament_status"] | null
          title?: string
          updated_at?: string | null
          venue_address?: string | null
          venue_contact?: string | null
          venue_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_tournaments_organizer_id"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tournaments_organizer_id"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_tournaments_organizer_id"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournaments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournaments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournaments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          balance_after: number | null
          club_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          metadata: Json | null
          reference_id: string | null
          reference_type: string | null
          status: string | null
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          balance_after?: number | null
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_type?: string | null
          status?: string | null
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          balance_after?: number | null
          club_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_type?: string | null
          status?: string | null
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      typing_indicators: {
        Row: {
          id: string
          is_typing: boolean | null
          room_id: string
          started_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          is_typing?: boolean | null
          room_id: string
          started_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          is_typing?: boolean | null
          room_id?: string
          started_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "typing_indicators_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "typing_indicators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "typing_indicators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "typing_indicators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          created_at: string | null
          earned_at: string | null
          id: string
          tournament_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          created_at?: string | null
          earned_at?: string | null
          id?: string
          tournament_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          created_at?: string | null
          earned_at?: string | null
          id?: string
          tournament_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "user_achievements_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_first_match_tracking: {
        Row: {
          awarded_at: string | null
          bonus_amount: number | null
          bonus_awarded: boolean | null
          club_id: string
          created_at: string | null
          first_match_date: string | null
          first_match_id: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          awarded_at?: string | null
          bonus_amount?: number | null
          bonus_awarded?: boolean | null
          club_id: string
          created_at?: string | null
          first_match_date?: string | null
          first_match_id?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          awarded_at?: string | null
          bonus_amount?: number | null
          bonus_awarded?: boolean | null
          club_id?: string
          created_at?: string | null
          first_match_date?: string | null
          first_match_id?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_first_match_tracking_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_first_match_tracking_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_first_match_tracking_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_first_match_tracking_first_match_id_fkey"
            columns: ["first_match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_first_match_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_first_match_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_first_match_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_follows: {
        Row: {
          created_at: string | null
          follower_id: string | null
          following_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_journey_events: {
        Row: {
          action: string | null
          app_version: string | null
          created_at: string | null
          event_category: string | null
          event_name: string
          id: string
          platform: string | null
          properties: Json | null
          screen_name: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          app_version?: string | null
          created_at?: string | null
          event_category?: string | null
          event_name: string
          id?: string
          platform?: string | null
          properties?: Json | null
          screen_name?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          app_version?: string | null
          created_at?: string | null
          event_category?: string | null
          event_name?: string
          id?: string
          platform?: string | null
          properties?: Json | null
          screen_name?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_journey_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_journey_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_journey_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_loyalty_points: {
        Row: {
          club_id: string
          created_at: string | null
          current_balance: number | null
          current_tier: string | null
          id: string
          last_earned_at: string | null
          last_redeemed_at: string | null
          next_tier: string | null
          points_expired: number | null
          points_redeemed: number | null
          points_to_next_tier: number | null
          program_id: string
          tier_achieved_at: string | null
          tier_benefits: Json | null
          tier_discount_percentage: number | null
          tier_priority_booking: boolean | null
          total_points_earned: number | null
          total_redemptions: number | null
          total_transactions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          club_id: string
          created_at?: string | null
          current_balance?: number | null
          current_tier?: string | null
          id?: string
          last_earned_at?: string | null
          last_redeemed_at?: string | null
          next_tier?: string | null
          points_expired?: number | null
          points_redeemed?: number | null
          points_to_next_tier?: number | null
          program_id: string
          tier_achieved_at?: string | null
          tier_benefits?: Json | null
          tier_discount_percentage?: number | null
          tier_priority_booking?: boolean | null
          total_points_earned?: number | null
          total_redemptions?: number | null
          total_transactions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          club_id?: string
          created_at?: string | null
          current_balance?: number | null
          current_tier?: string | null
          id?: string
          last_earned_at?: string | null
          last_redeemed_at?: string | null
          next_tier?: string | null
          points_expired?: number | null
          points_redeemed?: number | null
          points_to_next_tier?: number | null
          program_id?: string
          tier_achieved_at?: string | null
          tier_benefits?: Json | null
          tier_discount_percentage?: number | null
          tier_priority_booking?: boolean | null
          total_points_earned?: number | null
          total_redemptions?: number | null
          total_transactions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_loyalty_points_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_loyalty_points_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_loyalty_points_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_loyalty_points_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "loyalty_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_loyalty_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_loyalty_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_loyalty_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          allow_challenges: boolean | null
          allow_friend_requests: boolean | null
          auto_accept_friends: boolean | null
          created_at: string | null
          email_notifications: boolean | null
          id: string
          language: string | null
          max_challenge_distance: number | null
          notification_types: Json | null
          notify_challenges: boolean | null
          notify_club_updates: boolean | null
          notify_match_invites: boolean | null
          notify_match_results: boolean | null
          notify_rank_changes: boolean | null
          notify_spa_transactions: boolean | null
          notify_system_updates: boolean | null
          notify_tournament_invites: boolean | null
          preferred_game_types: string[] | null
          privacy_settings: Json | null
          push_notifications: boolean | null
          show_location: boolean | null
          show_online_status: boolean | null
          show_stats_publicly: boolean | null
          sms_notifications: boolean | null
          theme: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          allow_challenges?: boolean | null
          allow_friend_requests?: boolean | null
          auto_accept_friends?: boolean | null
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          max_challenge_distance?: number | null
          notification_types?: Json | null
          notify_challenges?: boolean | null
          notify_club_updates?: boolean | null
          notify_match_invites?: boolean | null
          notify_match_results?: boolean | null
          notify_rank_changes?: boolean | null
          notify_spa_transactions?: boolean | null
          notify_system_updates?: boolean | null
          notify_tournament_invites?: boolean | null
          preferred_game_types?: string[] | null
          privacy_settings?: Json | null
          push_notifications?: boolean | null
          show_location?: boolean | null
          show_online_status?: boolean | null
          show_stats_publicly?: boolean | null
          sms_notifications?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          allow_challenges?: boolean | null
          allow_friend_requests?: boolean | null
          auto_accept_friends?: boolean | null
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          max_challenge_distance?: number | null
          notification_types?: Json | null
          notify_challenges?: boolean | null
          notify_club_updates?: boolean | null
          notify_match_invites?: boolean | null
          notify_match_results?: boolean | null
          notify_rank_changes?: boolean | null
          notify_spa_transactions?: boolean | null
          notify_system_updates?: boolean | null
          notify_tournament_invites?: boolean | null
          preferred_game_types?: string[] | null
          privacy_settings?: Json | null
          push_notifications?: boolean | null
          show_location?: boolean | null
          show_online_status?: boolean | null
          show_stats_publicly?: boolean | null
          sms_notifications?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_privacy_settings: {
        Row: {
          allow_challenges_from_strangers: boolean | null
          allow_friend_requests: boolean | null
          allow_tournament_invitations: boolean | null
          appear_in_suggestions: boolean | null
          created_at: string | null
          id: string
          notify_on_challenge: boolean | null
          notify_on_friend_request: boolean | null
          notify_on_match_result: boolean | null
          notify_on_tournament_invite: boolean | null
          searchable_by_phone: boolean | null
          searchable_by_real_name: boolean | null
          searchable_by_username: boolean | null
          show_achievements: boolean | null
          show_club_membership: boolean | null
          show_current_rank: boolean | null
          show_email: boolean | null
          show_in_challenge_list: boolean | null
          show_in_leaderboard: boolean | null
          show_in_social_feed: boolean | null
          show_in_tournament_participants: boolean | null
          show_location: boolean | null
          show_match_history: boolean | null
          show_online_status: boolean | null
          show_phone_number: boolean | null
          show_real_name: boolean | null
          show_win_loss_record: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          allow_challenges_from_strangers?: boolean | null
          allow_friend_requests?: boolean | null
          allow_tournament_invitations?: boolean | null
          appear_in_suggestions?: boolean | null
          created_at?: string | null
          id?: string
          notify_on_challenge?: boolean | null
          notify_on_friend_request?: boolean | null
          notify_on_match_result?: boolean | null
          notify_on_tournament_invite?: boolean | null
          searchable_by_phone?: boolean | null
          searchable_by_real_name?: boolean | null
          searchable_by_username?: boolean | null
          show_achievements?: boolean | null
          show_club_membership?: boolean | null
          show_current_rank?: boolean | null
          show_email?: boolean | null
          show_in_challenge_list?: boolean | null
          show_in_leaderboard?: boolean | null
          show_in_social_feed?: boolean | null
          show_in_tournament_participants?: boolean | null
          show_location?: boolean | null
          show_match_history?: boolean | null
          show_online_status?: boolean | null
          show_phone_number?: boolean | null
          show_real_name?: boolean | null
          show_win_loss_record?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          allow_challenges_from_strangers?: boolean | null
          allow_friend_requests?: boolean | null
          allow_tournament_invitations?: boolean | null
          appear_in_suggestions?: boolean | null
          created_at?: string | null
          id?: string
          notify_on_challenge?: boolean | null
          notify_on_friend_request?: boolean | null
          notify_on_match_result?: boolean | null
          notify_on_tournament_invite?: boolean | null
          searchable_by_phone?: boolean | null
          searchable_by_real_name?: boolean | null
          searchable_by_username?: boolean | null
          show_achievements?: boolean | null
          show_club_membership?: boolean | null
          show_current_rank?: boolean | null
          show_email?: boolean | null
          show_in_challenge_list?: boolean | null
          show_in_leaderboard?: boolean | null
          show_in_social_feed?: boolean | null
          show_in_tournament_participants?: boolean | null
          show_location?: boolean | null
          show_match_history?: boolean | null
          show_online_status?: boolean | null
          show_phone_number?: boolean | null
          show_real_name?: boolean | null
          show_win_loss_record?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_privacy_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_privacy_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_privacy_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_spa_balances: {
        Row: {
          club_id: string
          created_at: string | null
          current_balance: number | null
          id: string
          last_earned_at: string | null
          last_spent_at: string | null
          total_earned: number | null
          total_spent: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          club_id: string
          created_at?: string | null
          current_balance?: number | null
          id?: string
          last_earned_at?: string | null
          last_spent_at?: string | null
          total_earned?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          club_id?: string
          created_at?: string | null
          current_balance?: number | null
          id?: string
          last_earned_at?: string | null
          last_spent_at?: string | null
          total_earned?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_spa_balances_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_spa_balances_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_spa_balances_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_spa_balances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_spa_balances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_spa_balances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vouchers: {
        Row: {
          campaign_id: string
          can_use_for_table_payment: boolean | null
          club_id: string
          expires_at: string | null
          id: string
          issue_details: Json | null
          issue_reason: string | null
          issued_at: string | null
          prize_position: number | null
          rewards: Json
          status: string
          tournament_id: string | null
          usage_rules: Json | null
          used_at: string | null
          used_details: Json | null
          user_id: string
          voucher_code: string
          voucher_value: number | null
        }
        Insert: {
          campaign_id: string
          can_use_for_table_payment?: boolean | null
          club_id: string
          expires_at?: string | null
          id?: string
          issue_details?: Json | null
          issue_reason?: string | null
          issued_at?: string | null
          prize_position?: number | null
          rewards?: Json
          status?: string
          tournament_id?: string | null
          usage_rules?: Json | null
          used_at?: string | null
          used_details?: Json | null
          user_id: string
          voucher_code: string
          voucher_value?: number | null
        }
        Update: {
          campaign_id?: string
          can_use_for_table_payment?: boolean | null
          club_id?: string
          expires_at?: string | null
          id?: string
          issue_details?: Json | null
          issue_reason?: string | null
          issued_at?: string | null
          prize_position?: number | null
          rewards?: Json
          status?: string
          tournament_id?: string | null
          usage_rules?: Json | null
          used_at?: string | null
          used_details?: Json | null
          user_id?: string
          voucher_code?: string
          voucher_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_vouchers_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_vouchers_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vouchers_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "user_vouchers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "recent_tournament_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vouchers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_statistics"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "user_vouchers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vouchers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_vouchers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_vouchers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          challenge_win_streak: number | null
          cover_photo_url: string | null
          created_at: string | null
          date_of_birth: string | null
          display_name: string | null
          elo_rating: number | null
          email: string | null
          favorite_game: string | null
          full_name: string
          id: string
          initialization_completed_at: string | null
          initialization_status: string | null
          is_active: boolean | null
          is_available_for_challenges: boolean | null
          is_online: boolean | null
          is_verified: boolean | null
          last_seen: string | null
          latitude: number | null
          location: string | null
          location_name: string | null
          longitude: number | null
          losses: number | null
          max_challenge_distance: number | null
          phone: string | null
          preferred_match_type: string | null
          rank: string | null
          ranking_points: number | null
          referral_bonus_claimed: boolean | null
          referral_stats: Json | null
          referred_by: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          skill_level: Database["public"]["Enums"]["skill_level"] | null
          spa_points: number | null
          spa_points_lost: number | null
          spa_points_won: number | null
          total_games: number | null
          total_losses: number | null
          total_matches: number | null
          total_prize_pool: number | null
          total_tournaments: number | null
          total_wins: number | null
          tournament_podiums: number | null
          tournament_wins: number | null
          tournaments_played: number | null
          updated_at: string | null
          username: string | null
          win_streak: number | null
          wins: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          challenge_win_streak?: number | null
          cover_photo_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          elo_rating?: number | null
          email?: string | null
          favorite_game?: string | null
          full_name: string
          id: string
          initialization_completed_at?: string | null
          initialization_status?: string | null
          is_active?: boolean | null
          is_available_for_challenges?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          latitude?: number | null
          location?: string | null
          location_name?: string | null
          longitude?: number | null
          losses?: number | null
          max_challenge_distance?: number | null
          phone?: string | null
          preferred_match_type?: string | null
          rank?: string | null
          ranking_points?: number | null
          referral_bonus_claimed?: boolean | null
          referral_stats?: Json | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          spa_points?: number | null
          spa_points_lost?: number | null
          spa_points_won?: number | null
          total_games?: number | null
          total_losses?: number | null
          total_matches?: number | null
          total_prize_pool?: number | null
          total_tournaments?: number | null
          total_wins?: number | null
          tournament_podiums?: number | null
          tournament_wins?: number | null
          tournaments_played?: number | null
          updated_at?: string | null
          username?: string | null
          win_streak?: number | null
          wins?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          challenge_win_streak?: number | null
          cover_photo_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          elo_rating?: number | null
          email?: string | null
          favorite_game?: string | null
          full_name?: string
          id?: string
          initialization_completed_at?: string | null
          initialization_status?: string | null
          is_active?: boolean | null
          is_available_for_challenges?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          latitude?: number | null
          location?: string | null
          location_name?: string | null
          longitude?: number | null
          losses?: number | null
          max_challenge_distance?: number | null
          phone?: string | null
          preferred_match_type?: string | null
          rank?: string | null
          ranking_points?: number | null
          referral_bonus_claimed?: boolean | null
          referral_stats?: Json | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          spa_points?: number | null
          spa_points_lost?: number | null
          spa_points_won?: number | null
          total_games?: number | null
          total_losses?: number | null
          total_matches?: number | null
          total_prize_pool?: number | null
          total_tournaments?: number | null
          total_wins?: number | null
          tournament_podiums?: number | null
          tournament_wins?: number | null
          tournaments_played?: number | null
          updated_at?: string | null
          username?: string | null
          win_streak?: number | null
          wins?: number | null
        }
        Relationships: []
      }
      verification_audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown
          new_status: string | null
          old_status: string | null
          performed_at: string | null
          performed_by: string | null
          reason: string | null
          user_agent: string | null
          verification_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_status?: string | null
          old_status?: string | null
          performed_at?: string | null
          performed_by?: string | null
          reason?: string | null
          user_agent?: string | null
          verification_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_status?: string | null
          old_status?: string | null
          performed_at?: string | null
          performed_by?: string | null
          reason?: string | null
          user_agent?: string | null
          verification_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_audit_log_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "club_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_audit_log_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "task_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      voucher_analytics_summary: {
        Row: {
          avg_days_to_use: number | null
          avg_discount_per_voucher: number | null
          campaign_effectiveness_score: number | null
          campaign_id: string
          campaign_roi: number | null
          club_id: string
          expiry_rate: number | null
          first_issued_at: string | null
          id: string
          last_calculated_at: string | null
          last_used_at: string | null
          redemption_conversion: number | null
          total_bonus_time_minutes: number | null
          total_discount_given: number | null
          total_vouchers_expired: number | null
          total_vouchers_issued: number | null
          total_vouchers_used: number | null
          unique_users_issued: number | null
          unique_users_redeemed: number | null
          usage_rate: number | null
          vouchers_unused: number | null
        }
        Insert: {
          avg_days_to_use?: number | null
          avg_discount_per_voucher?: number | null
          campaign_effectiveness_score?: number | null
          campaign_id: string
          campaign_roi?: number | null
          club_id: string
          expiry_rate?: number | null
          first_issued_at?: string | null
          id?: string
          last_calculated_at?: string | null
          last_used_at?: string | null
          redemption_conversion?: number | null
          total_bonus_time_minutes?: number | null
          total_discount_given?: number | null
          total_vouchers_expired?: number | null
          total_vouchers_issued?: number | null
          total_vouchers_used?: number | null
          unique_users_issued?: number | null
          unique_users_redeemed?: number | null
          usage_rate?: number | null
          vouchers_unused?: number | null
        }
        Update: {
          avg_days_to_use?: number | null
          avg_discount_per_voucher?: number | null
          campaign_effectiveness_score?: number | null
          campaign_id?: string
          campaign_roi?: number | null
          club_id?: string
          expiry_rate?: number | null
          first_issued_at?: string | null
          id?: string
          last_calculated_at?: string | null
          last_used_at?: string | null
          redemption_conversion?: number | null
          total_bonus_time_minutes?: number | null
          total_discount_given?: number | null
          total_vouchers_expired?: number | null
          total_vouchers_issued?: number | null
          total_vouchers_used?: number | null
          unique_users_issued?: number | null
          unique_users_redeemed?: number | null
          usage_rate?: number | null
          vouchers_unused?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "voucher_analytics_summary_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "voucher_analytics_summary_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_analytics_summary_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      voucher_campaigns: {
        Row: {
          admin_notes: string | null
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          campaign_type: string
          club_id: string
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          issued_quantity: number | null
          start_date: string
          title: string
          total_quantity: number
          updated_at: string | null
          voucher_type: string
          voucher_value: number
        }
        Insert: {
          admin_notes?: string | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          campaign_type: string
          club_id: string
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          issued_quantity?: number | null
          start_date: string
          title: string
          total_quantity: number
          updated_at?: string | null
          voucher_type: string
          voucher_value: number
        }
        Update: {
          admin_notes?: string | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          campaign_type?: string
          club_id?: string
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          issued_quantity?: number | null
          start_date?: string
          title?: string
          total_quantity?: number
          updated_at?: string | null
          voucher_type?: string
          voucher_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "voucher_campaigns_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_campaigns_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "voucher_campaigns_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_campaigns_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "voucher_campaigns_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_campaigns_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      voucher_registration_requests: {
        Row: {
          admin_notes: string | null
          business_justification: string
          campaign_id: string | null
          club_id: string
          created_at: string | null
          description: string
          id: string
          proposed_rewards: Json
          rejection_reason: string | null
          requested_budget: Json
          requested_end_date: string
          requested_start_date: string
          status: string
          target_criteria: Json
          title: string
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          business_justification: string
          campaign_id?: string | null
          club_id: string
          created_at?: string | null
          description: string
          id?: string
          proposed_rewards?: Json
          rejection_reason?: string | null
          requested_budget?: Json
          requested_end_date: string
          requested_start_date: string
          status?: string
          target_criteria?: Json
          title: string
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          business_justification?: string
          campaign_id?: string | null
          club_id?: string
          created_at?: string | null
          description?: string
          id?: string
          proposed_rewards?: Json
          rejection_reason?: string | null
          requested_budget?: Json
          requested_end_date?: string
          requested_start_date?: string
          status?: string
          target_criteria?: Json
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voucher_registration_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "voucher_registration_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_registration_requests_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      voucher_templates: {
        Row: {
          campaign_type: string
          category: string
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          target_type: string
          template_data: Json
          template_id: string
          title: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          campaign_type: string
          category: string
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          target_type: string
          template_data?: Json
          template_id: string
          title: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          campaign_type?: string
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          target_type?: string
          template_data?: Json
          template_id?: string
          title?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      voucher_usage_history: {
        Row: {
          additional_benefits: Json | null
          bonus_time_minutes: number | null
          club_id: string
          discount_amount: number | null
          final_amount: number | null
          id: string
          original_amount: number | null
          session_id: string | null
          used_at: string | null
          user_id: string
          voucher_id: string
        }
        Insert: {
          additional_benefits?: Json | null
          bonus_time_minutes?: number | null
          club_id: string
          discount_amount?: number | null
          final_amount?: number | null
          id?: string
          original_amount?: number | null
          session_id?: string | null
          used_at?: string | null
          user_id: string
          voucher_id: string
        }
        Update: {
          additional_benefits?: Json | null
          bonus_time_minutes?: number | null
          club_id?: string
          discount_amount?: number | null
          final_amount?: number | null
          id?: string
          original_amount?: number | null
          session_id?: string | null
          used_at?: string | null
          user_id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_usage_history_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "voucher_usage_history_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_usage_history_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "voucher_usage_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranked_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_usage_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_performance_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "voucher_usage_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_usage_history_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "user_vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      welcome_campaign_clubs: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          campaign_id: string | null
          club_id: string | null
          created_at: string | null
          id: string
          rejection_reason: string | null
          status: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          campaign_id?: string | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          rejection_reason?: string | null
          status?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          campaign_id?: string | null
          club_id?: string | null
          created_at?: string | null
          id?: string
          rejection_reason?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "welcome_campaign_clubs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "welcome_voucher_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welcome_campaign_clubs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "welcome_campaign_clubs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welcome_campaign_clubs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      welcome_voucher_campaigns: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          max_redemptions: number | null
          name: string
          start_date: string | null
          trigger_on_first_login: boolean | null
          updated_at: string | null
          voucher_code_prefix: string | null
          voucher_template_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_redemptions?: number | null
          name: string
          start_date?: string | null
          trigger_on_first_login?: boolean | null
          updated_at?: string | null
          voucher_code_prefix?: string | null
          voucher_template_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_redemptions?: number | null
          name?: string
          start_date?: string | null
          trigger_on_first_login?: boolean | null
          updated_at?: string | null
          voucher_code_prefix?: string | null
          voucher_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "welcome_voucher_campaigns_voucher_template_id_fkey"
            columns: ["voucher_template_id"]
            isOneToOne: false
            referencedRelation: "voucher_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      welcome_voucher_issued: {
        Row: {
          campaign_id: string | null
          id: string
          issued_at: string | null
          user_id: string | null
          voucher_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          id?: string
          issued_at?: string | null
          user_id?: string | null
          voucher_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          id?: string
          issued_at?: string | null
          user_id?: string | null
          voucher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "welcome_voucher_issued_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "welcome_voucher_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welcome_voucher_issued_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "user_vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_challenges_summary: {
        Row: {
          challenge_type: string | null
          challenged_name: string | null
          challenged_rank: string | null
          challenger_name: string | null
          challenger_rank: string | null
          created_at: string | null
          handicap_challenged: number | null
          handicap_challenger: number | null
          id: string | null
          stakes_amount: number | null
          status: string | null
        }
        Relationships: []
      }
      challenge_eligibility: {
        Row: {
          can_challenge: boolean | null
          challenger_rank: string | null
          challenger_value: number | null
          rank_difference: number | null
          target_rank: string | null
          target_value: number | null
        }
        Relationships: []
      }
      club_analytics_summary: {
        Row: {
          club_id: string | null
          club_name: string | null
          completed_tournaments: number | null
          new_members_30d: number | null
          ongoing_tournaments: number | null
          total_members: number | null
          total_revenue: number | null
          total_tournaments: number | null
        }
        Relationships: []
      }
      first_match_bonus_stats: {
        Row: {
          active_days: number | null
          avg_bonus_amount: number | null
          club_id: string | null
          club_name: string | null
          first_award_date: string | null
          latest_award_date: string | null
          total_bonus_paid: number | null
          total_users_awarded: number | null
        }
        Relationships: []
      }
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      ranked_users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          challenge_win_streak: number | null
          cover_photo_url: string | null
          created_at: string | null
          date_of_birth: string | null
          display_name: string | null
          elo_rating: number | null
          email: string | null
          favorite_game: string | null
          full_name: string | null
          id: string | null
          is_active: boolean | null
          is_available_for_challenges: boolean | null
          is_online: boolean | null
          is_verified: boolean | null
          last_seen: string | null
          latitude: number | null
          location: string | null
          location_name: string | null
          longitude: number | null
          losses: number | null
          max_challenge_distance: number | null
          phone: string | null
          preferred_match_type: string | null
          rank: string | null
          ranking_points: number | null
          referral_bonus_claimed: boolean | null
          referral_stats: Json | null
          referred_by: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          skill_level: Database["public"]["Enums"]["skill_level"] | null
          spa_points: number | null
          spa_points_lost: number | null
          spa_points_won: number | null
          total_games: number | null
          total_losses: number | null
          total_matches: number | null
          total_prize_pool: number | null
          total_tournaments: number | null
          total_wins: number | null
          tournament_podiums: number | null
          tournament_wins: number | null
          tournaments_played: number | null
          updated_at: string | null
          username: string | null
          win_streak: number | null
          wins: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          challenge_win_streak?: number | null
          cover_photo_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          elo_rating?: number | null
          email?: string | null
          favorite_game?: string | null
          full_name?: string | null
          id?: string | null
          is_active?: boolean | null
          is_available_for_challenges?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          latitude?: number | null
          location?: string | null
          location_name?: string | null
          longitude?: number | null
          losses?: number | null
          max_challenge_distance?: number | null
          phone?: string | null
          preferred_match_type?: string | null
          rank?: string | null
          ranking_points?: number | null
          referral_bonus_claimed?: boolean | null
          referral_stats?: Json | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          spa_points?: number | null
          spa_points_lost?: number | null
          spa_points_won?: number | null
          total_games?: number | null
          total_losses?: number | null
          total_matches?: number | null
          total_prize_pool?: number | null
          total_tournaments?: number | null
          total_wins?: number | null
          tournament_podiums?: number | null
          tournament_wins?: number | null
          tournaments_played?: number | null
          updated_at?: string | null
          username?: string | null
          win_streak?: number | null
          wins?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          challenge_win_streak?: number | null
          cover_photo_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          elo_rating?: number | null
          email?: string | null
          favorite_game?: string | null
          full_name?: string | null
          id?: string | null
          is_active?: boolean | null
          is_available_for_challenges?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          latitude?: number | null
          location?: string | null
          location_name?: string | null
          longitude?: number | null
          losses?: number | null
          max_challenge_distance?: number | null
          phone?: string | null
          preferred_match_type?: string | null
          rank?: string | null
          ranking_points?: number | null
          referral_bonus_claimed?: boolean | null
          referral_stats?: Json | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          spa_points?: number | null
          spa_points_lost?: number | null
          spa_points_won?: number | null
          total_games?: number | null
          total_losses?: number | null
          total_matches?: number | null
          total_prize_pool?: number | null
          total_tournaments?: number | null
          total_wins?: number | null
          tournament_podiums?: number | null
          tournament_wins?: number | null
          tournaments_played?: number | null
          updated_at?: string | null
          username?: string | null
          win_streak?: number | null
          wins?: number | null
        }
        Relationships: []
      }
      recent_tournament_activity: {
        Row: {
          club_name: string | null
          current_participants: number | null
          id: string | null
          max_participants: number | null
          organizer_name: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["tournament_status"] | null
          title: string | null
        }
        Relationships: []
      }
      reservation_details: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          club_address: string | null
          club_id: string | null
          club_image: string | null
          club_name: string | null
          club_phone: string | null
          confirmed_at: string | null
          created_at: string | null
          deposit_amount: number | null
          duration_hours: number | null
          end_time: string | null
          id: string | null
          notes: string | null
          number_of_players: number | null
          payment_method: string | null
          payment_status: string | null
          price_per_hour: number | null
          special_requests: string | null
          start_time: string | null
          status: string | null
          table_number: number | null
          total_price: number | null
          updated_at: string | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
          user_phone: string | null
        }
        Relationships: [
          {
            foreignKeyName: "table_reservations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "table_reservations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_reservations_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      spa_economy_health: {
        Row: {
          active_users: number | null
          avg_earning_per_transaction: number | null
          total_earned: number | null
          total_spent: number | null
          transactions_24h: number | null
          transactions_7d: number | null
        }
        Relationships: []
      }
      tournament_statistics: {
        Row: {
          club_id: string | null
          completed_matches: number | null
          current_participants: number | null
          entry_fee: number | null
          max_participants: number | null
          prize_pool: number | null
          status: Database["public"]["Enums"]["tournament_status"] | null
          title: string | null
          total_matches: number | null
          tournament_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "club_analytics_summary"
            referencedColumns: ["club_id"]
          },
          {
            foreignKeyName: "tournaments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournaments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "first_match_bonus_stats"
            referencedColumns: ["club_id"]
          },
        ]
      }
      user_performance_stats: {
        Row: {
          display_name: string | null
          elo_rating: number | null
          rank: string | null
          spa_points: number | null
          total_losses: number | null
          total_wins: number | null
          tournaments_participated: number | null
          user_id: string | null
          win_rate: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      accept_challenge: {
        Args: { challenge_id_param: string; response_message_param?: string }
        Returns: string
      }
      add_spa_to_club: {
        Args: {
          p_club_id: string
          p_description?: string
          p_spa_amount: number
        }
        Returns: boolean
      }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      admin_add_all_users_to_tournament: {
        Args: { p_tournament_id: string }
        Returns: Json
      }
      admin_add_users_to_tournament: {
        Args: { p_tournament_id: string; p_user_ids: string[] }
        Returns: Json
      }
      admin_approve_rank_change_request: {
        Args: { p_approved: boolean; p_comments?: string; p_request_id: string }
        Returns: Json
      }
      admin_remove_all_users_from_tournament: {
        Args: { p_tournament_id: string }
        Returns: Json
      }
      advance_player_atomic: {
        Args: {
          p_player_id: string
          p_target_display_order: number
          p_tournament_id: string
        }
        Returns: Json
      }
      apply_voucher_to_table_payment: {
        Args: {
          p_club_id: string
          p_original_amount: number
          p_session_end?: string
          p_session_start: string
          p_table_number: number
          p_user_id: string
          p_voucher_code: string
        }
        Returns: Json
      }
      archive_old_notifications: {
        Args: { days_old?: number }
        Returns: number
      }
      assign_initial_rank: {
        Args: { initial_elo?: number; user_id: string }
        Returns: Json
      }
      auto_cancel_expired_reservations: { Args: never; Returns: undefined }
      auto_close_shift: { Args: { session_id: string }; Returns: boolean }
      auto_update_promotion_status: { Args: never; Returns: number }
      auto_verify_task_submission: {
        Args: { p_verification_id: string }
        Returns: Json
      }
      award_loyalty_points: {
        Args: {
          p_club_id: string
          p_description?: string
          p_multiplier?: number
          p_points: number
          p_reference_id?: string
          p_reference_type?: string
          p_transaction_type: string
          p_user_id: string
        }
        Returns: Json
      }
      award_spa_bonus: {
        Args: {
          p_club_id: string
          p_match_id?: string
          p_spa_amount: number
          p_user_id: string
        }
        Returns: boolean
      }
      calculate_challenge_handicap: {
        Args: {
          bet_amount: number
          challenger_rank: string
          target_rank: string
        }
        Returns: {
          challenged_handicap: number
          challenger_handicap: number
          explanation: string
          is_valid: boolean
          race_to: number
        }[]
      }
      calculate_elo_change: {
        Args: {
          k_factor?: number
          player1_elo: number
          player1_won: boolean
          player2_elo: number
        }
        Returns: {
          player1_change: number
          player1_new_elo: number
          player2_change: number
          player2_new_elo: number
        }[]
      }
      calculate_promotion_daily_analytics: {
        Args: { p_date: string; p_promotion_id: string }
        Returns: Json
      }
      calculate_promotion_roi: {
        Args: { p_promotion_id: string }
        Returns: Json
      }
      calculate_shift_summary: { Args: { session_id: string }; Returns: Json }
      calculate_user_tier: {
        Args: { p_points: number; p_tier_system: Json }
        Returns: string
      }
      calculate_voucher_analytics: {
        Args: { p_campaign_id: string }
        Returns: Json
      }
      can_challenge_rank: {
        Args: { challenger_rank: string; target_rank: string }
        Returns: boolean
      }
      check_and_award_first_match_bonus: {
        Args: { p_club_id: string; p_match_id: string; p_user_id: string }
        Returns: Json
      }
      check_campaign_eligibility: {
        Args: { p_campaign_id: string; p_user_id: string }
        Returns: boolean
      }
      cleanup_test_data: { Args: never; Returns: undefined }
      club_review_rank_change_request: {
        Args: { p_approved: boolean; p_comments?: string; p_request_id: string }
        Returns: Json
      }
      compare_promotions: {
        Args: { p_promotion_ids: string[] }
        Returns: {
          avg_discount: number
          promotion_id: string
          promotion_title: string
          roi_percentage: number
          total_discount: number
          total_redemptions: number
          total_revenue: number
          unique_users: number
        }[]
      }
      complete_admin_guide: {
        Args: { p_guide_id: string; p_user_id: string }
        Returns: undefined
      }
      create_challenge: {
        Args: {
          challenge_type_param: string
          challenged_user_id: string
          match_conditions_param?: Json
          message_param?: string
          stakes_amount_param?: number
          stakes_type_param?: string
        }
        Returns: string
      }
      create_comment: {
        Args: { content: string; post_id: string }
        Returns: Json
      }
      create_match:
        | {
            Args: {
              match_number_param?: number
              match_type_param?: string
              player1_id_param: string
              player2_id_param: string
              round_number_param?: number
              tournament_id_param: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_match_type?: string
              p_player1_id: string
              p_player2_id: string
              p_round_number?: number
              p_tournament_id: string
            }
            Returns: Json
          }
        | {
            Args: {
              match_type_param?: string
              player1_id_param: string
              player2_id_param: string
              tournament_id_param: string
            }
            Returns: Json
          }
      create_notification: {
        Args: {
          action_data?: Json
          action_type?: string
          expires_in_hours?: number
          notification_data?: Json
          notification_message: string
          notification_priority?: number
          notification_title: string
          notification_type: string
          target_user_id: string
        }
        Returns: string
      }
      create_tournament_match_post: {
        Args: { p_match_id: string; p_trigger_type?: string }
        Returns: string
      }
      decline_challenge: {
        Args: { challenge_id_param: string; response_message_param?: string }
        Returns: boolean
      }
      decrement_post_comments: { Args: { post_id: string }; Returns: undefined }
      decrement_post_likes: { Args: { post_id: string }; Returns: undefined }
      decrement_tournament_participants: {
        Args: { tournament_id: string }
        Returns: undefined
      }
      delete_comment: { Args: { comment_id: string }; Returns: Json }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
      dropgeometrytable:
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
      enablelongtransactions: { Args: never; Returns: string }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      exec_sql: { Args: { query: string }; Returns: Json }
      execute_migration_batch: {
        Args: { sql_statements: string[] }
        Returns: {
          query: string
          result: string
          statement_number: number
          status: string
        }[]
      }
      execute_sql: { Args: { sql_query: string }; Returns: string }
      expire_loyalty_points: { Args: never; Returns: number }
      generate_membership_id: { Args: never; Returns: string }
      generate_voucher_code: { Args: never; Returns: string }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      get_auth_users_count: { Args: never; Returns: number }
      get_auth_users_sample: {
        Args: never
        Returns: {
          created_at: string
          email: string
          id: string
        }[]
      }
      get_available_tables: {
        Args: { p_club_id: string; p_end_time: string; p_start_time: string }
        Returns: {
          table_number: number
        }[]
      }
      get_club_members: { Args: { club_id_param: string }; Returns: Json }
      get_club_pricing: { Args: { p_club_id: string }; Returns: Json }
      get_club_promotion_metrics: {
        Args: { p_club_id: string; p_end_date?: string; p_start_date?: string }
        Returns: Json
      }
      get_club_qr_data: { Args: { p_club_id: string }; Returns: Json }
      get_club_review_stats: { Args: { club_id_param: string }; Returns: Json }
      get_delivery_trends: { Args: { days?: number }; Returns: Json }
      get_follow_counts: {
        Args: { p_user_id: string }
        Returns: {
          followers_count: number
          following_count: number
        }[]
      }
      get_following_feed: {
        Args: { p_limit?: number; p_offset?: number; p_user_id: string }
        Returns: {
          author_avatar: string
          author_id: string
          author_name: string
          club_id: string
          club_logo: string
          club_name: string
          comment_count: number
          content: string
          created_at: string
          hashtags: string[]
          image_urls: string[]
          like_count: number
          post_id: string
          share_count: number
        }[]
      }
      get_leaderboard: {
        Args: {
          board_type?: string
          limit_count?: number
          rank_filter?: string
        }
        Returns: {
          avatar_url: string
          display_name: string
          elo_rating: number
          player_id: string
          player_rank: string
          rank: number
          recent_activity: string
          spa_points: number
          total_wins: number
          tournament_wins: number
          username: string
          win_rate: number
        }[]
      }
      get_loyalty_stats: { Args: { p_club_id: string }; Returns: Json }
      get_nearby_feed: {
        Args: { p_limit?: number; p_offset?: number; p_user_id: string }
        Returns: {
          author_avatar: string
          author_id: string
          author_name: string
          club_id: string
          club_logo: string
          club_name: string
          comment_count: number
          content: string
          created_at: string
          hashtags: string[]
          image_urls: string[]
          like_count: number
          post_id: string
          share_count: number
        }[]
      }
      get_nearby_players: {
        Args: { center_lat: number; center_lng: number; radius_km?: number }
        Returns: {
          avatar_url: string
          challenge_win_streak: number
          display_name: string
          distance_km: number
          elo_rating: number
          is_available_for_challenges: boolean
          is_online: boolean
          location_name: string
          preferred_match_type: string
          ranking_points: number
          skill_level: string
          spa_points: number
          user_id: string
          username: string
        }[]
      }
      get_notification_funnel: { Args: never; Returns: Json }
      get_notification_heatmap: {
        Args: never
        Returns: {
          day_of_week: number
          hour_of_day: number
          notification_count: number
          read_rate: number
        }[]
      }
      get_notification_stats: { Args: never; Returns: Json }
      get_notification_type_performance: {
        Args: never
        Returns: {
          clicked: number
          ctr: number
          delivered: number
          delivery_rate: number
          notification_type: string
          read: number
          read_rate: number
          total_sent: number
        }[]
      }
      get_or_create_direct_room: {
        Args: { p_user1_id: string; p_user2_id: string }
        Returns: string
      }
      get_or_create_user_loyalty: {
        Args: { p_club_id: string; p_user_id: string }
        Returns: string
      }
      get_pending_rank_change_requests: {
        Args: { p_club_id?: string }
        Returns: Json
      }
      get_player_analytics: {
        Args: { player_uuid: string }
        Returns: {
          activity_level: string
          avg_matches_per_week: number
          current_win_streak: number
          days_since_last_match: number
          display_name: string
          elo_rating: number
          last_match_date: string
          losses: number
          player_id: string
          rank: string
          recent_matches: number
          recent_win_rate: number
          recent_wins: number
          spa_net_points: number
          spa_points: number
          spa_points_lost: number
          spa_points_won: number
          total_matches: number
          tournament_win_rate: number
          tournament_wins: number
          tournaments_played: number
          username: string
          win_rate: number
          wins: number
        }[]
      }
      get_post_comment_count: { Args: { post_id: string }; Returns: number }
      get_post_comments: {
        Args: { limit_count?: number; offset_count?: number; post_id: string }
        Returns: Json
      }
      get_rank_from_elo: { Args: { elo: number }; Returns: string }
      get_saved_posts: {
        Args: { p_limit?: number; p_offset?: number; p_user_id: string }
        Returns: {
          author_avatar: string
          author_id: string
          author_name: string
          comment_count: number
          content: string
          hashtags: string[]
          image_urls: string[]
          like_count: number
          post_created_at: string
          post_id: string
          saved_at: string
          share_count: number
        }[]
      }
      get_staff_performance_summary: {
        Args: { end_date?: string; input_staff_id: string; start_date?: string }
        Returns: {
          active_customers: number
          avg_transaction_value: number
          total_commissions: number
          total_referrals: number
          total_revenue: number
          total_transactions: number
        }[]
      }
      get_staff_tasks: {
        Args: {
          p_club_id: string
          p_limit?: number
          p_offset?: number
          p_staff_id?: string
          p_status?: string
        }
        Returns: {
          assigned_at: string
          assigned_by: string
          assigned_to: string
          assignment_notes: string
          club_id: string
          completed_at: string
          completion_notes: string
          completion_percentage: number
          created_at: string
          description: string
          due_at: string
          id: string
          priority: string
          required_location: Json
          staff_name: string
          started_at: string
          status: string
          task_name: string
          task_type: string
          template_id: string
          updated_at: string
          verification_status: string
        }[]
      }
      get_today_shift: {
        Args: { p_staff_id: string }
        Returns: {
          scheduled_end_time: string
          scheduled_start_time: string
          shift_date: string
          shift_id: string
          shift_status: string
        }[]
      }
      get_top_engaged_users: {
        Args: { limit_count?: number }
        Returns: {
          avg_response_time_minutes: number
          engagement_rate: number
          read_count: number
          total_notifications: number
          user_id: string
          user_name: string
        }[]
      }
      get_tournament_leaderboard: {
        Args: { tournament_id_param: string }
        Returns: Json
      }
      get_trending_hashtags: {
        Args: { p_limit?: number }
        Returns: {
          hashtag: string
          last_used_at: string
          use_count: number
        }[]
      }
      get_user_by_id: { Args: { user_id_param: string }; Returns: Json }
      get_user_challenges: {
        Args: { status_filter?: string; user_uuid?: string }
        Returns: {
          challenge_id: string
          challenge_type: string
          challenged_avatar: string
          challenged_id: string
          challenged_name: string
          challenger_avatar: string
          challenger_id: string
          challenger_name: string
          created_at: string
          expires_at: string
          is_challenger: boolean
          message: string
          response_message: string
          stakes_amount: number
          stakes_type: string
          status: string
        }[]
      }
      get_user_club_permissions: {
        Args: { p_club_id: string; p_user_id: string }
        Returns: {
          can_input_score: boolean
          can_manage_members: boolean
          can_manage_permissions: boolean
          can_manage_tables: boolean
          can_verify_rank: boolean
          can_view_reports: boolean
          role: string
        }[]
      }
      get_user_completed_guides_count: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_user_engagement_metrics: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_user_guides_in_progress: {
        Args: { p_user_id: string }
        Returns: {
          current_step: number
          guide_id: string
          last_accessed_at: string
        }[]
      }
      get_user_notifications: {
        Args: {
          include_read?: boolean
          limit_count?: number
          target_user_id: string
        }
        Returns: {
          action_data: Json
          action_type: string
          created_at: string
          data: Json
          expires_at: string
          id: string
          is_dismissed: boolean
          is_expired: boolean
          is_read: boolean
          message: string
          priority: number
          title: string
          type: string
        }[]
      }
      get_user_privacy_settings: {
        Args: { target_user_id: string }
        Returns: {
          allow_challenges_from_strangers: boolean
          allow_friend_requests: boolean
          allow_tournament_invitations: boolean
          appear_in_suggestions: boolean
          searchable_by_phone: boolean
          searchable_by_real_name: boolean
          searchable_by_username: boolean
          show_achievements: boolean
          show_club_membership: boolean
          show_current_rank: boolean
          show_email: boolean
          show_in_challenge_list: boolean
          show_in_leaderboard: boolean
          show_in_social_feed: boolean
          show_in_tournament_participants: boolean
          show_location: boolean
          show_match_history: boolean
          show_online_status: boolean
          show_phone_number: boolean
          show_real_name: boolean
          show_win_loss_record: boolean
        }[]
      }
      get_user_rank_history: { Args: { p_user_id: string }; Returns: Json }
      get_user_ranking: { Args: { user_uuid: string }; Returns: number }
      get_user_stats: { Args: { user_id_param: string }; Returns: Json }
      get_voucher_campaign_stats: {
        Args: never
        Returns: {
          approved_count: number
          pending_count: number
          rejected_count: number
        }[]
      }
      get_youtube_thumbnail_url: { Args: { video_id: string }; Returns: string }
      get_youtube_video_url: { Args: { video_id: string }; Returns: string }
      gettransactionid: { Args: never; Returns: unknown }
      has_user_liked_post: { Args: { post_id: string }; Returns: boolean }
      increment_hashtag_count: {
        Args: { p_hashtag: string }
        Returns: undefined
      }
      increment_post_comments: { Args: { post_id: string }; Returns: undefined }
      increment_post_likes: { Args: { post_id: string }; Returns: undefined }
      increment_review_helpful: {
        Args: { review_id_param: string }
        Returns: undefined
      }
      increment_tournament_participants: {
        Args: { tournament_id: string }
        Returns: undefined
      }
      is_cross_finals_match: { Args: { match_id: string }; Returns: boolean }
      is_following: {
        Args: { p_follower_id: string; p_following_id: string }
        Returns: boolean
      }
      is_post_hidden: {
        Args: { p_post_id: string; p_user_id: string }
        Returns: boolean
      }
      is_post_saved: {
        Args: { p_post_id: string; p_user_id: string }
        Returns: boolean
      }
      is_staff_checked_in: { Args: { p_staff_id: string }; Returns: boolean }
      is_table_available: {
        Args: {
          p_club_id: string
          p_end_time: string
          p_start_time: string
          p_table_number: number
        }
        Returns: boolean
      }
      is_tier_eligible: {
        Args: { p_required_tier: string; p_user_tier: string }
        Returns: boolean
      }
      issue_tournament_prize_vouchers: {
        Args: { p_position: number; p_tournament_id: string; p_user_id: string }
        Returns: Json
      }
      issue_voucher: {
        Args: {
          p_campaign_id: string
          p_club_id: string
          p_issue_details?: Json
          p_issue_reason?: string
          p_user_id: string
        }
        Returns: string
      }
      join_tournament: {
        Args: { tournament_id_param: string; user_id_param: string }
        Returns: Json
      }
      leave_tournament: {
        Args: { tournament_id_param: string; user_id_param: string }
        Returns: Json
      }
      like_post: { Args: { post_id: string }; Returns: Json }
      longtransactionsenabled: { Args: never; Returns: boolean }
      populate_geometry_columns:
        | { Args: { use_typmod?: boolean }; Returns: string }
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      process_scheduled_notifications: {
        Args: never
        Returns: {
          failed_count: number
          processed_count: number
          success_count: number
        }[]
      }
      redeem_loyalty_reward: {
        Args: { p_reward_id: string; p_user_id: string }
        Returns: Json
      }
      save_user_privacy_settings: {
        Args: { settings: Json; target_user_id: string }
        Returns: boolean
      }
      search_hashtags: {
        Args: { p_limit?: number; p_query: string }
        Returns: {
          hashtag: string
          use_count: number
        }[]
      }
      send_notification_from_template: {
        Args: { p_template_name: string; p_user_id: string; p_variables?: Json }
        Returns: string
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_askml:
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geom: unknown }; Returns: number }
        | { Args: { geog: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      start_match: { Args: { p_match_id: string }; Returns: Json }
      submit_rank_change_request: {
        Args: {
          p_evidence_urls?: string[]
          p_reason: string
          p_requested_rank: string
        }
        Returns: Json
      }
      submit_task_verification: {
        Args: {
          p_camera_metadata: Json
          p_captured_at: string
          p_captured_latitude: number
          p_captured_longitude: number
          p_device_info: Json
          p_location_accuracy: number
          p_photo_hash: string
          p_photo_size: number
          p_photo_url: string
          p_task_id: string
        }
        Returns: Json
      }
      test_execution: { Args: never; Returns: string }
      unlike_post: { Args: { post_id: string }; Returns: Json }
      unlockrows: { Args: { "": string }; Returns: number }
      update_comment: {
        Args: { comment_id: string; new_content: string }
        Returns: Json
      }
      update_comment_count: { Args: { post_id_param: string }; Returns: Json }
      update_match_result: {
        Args: {
          p_match_id: string
          p_player1_score: number
          p_player2_score: number
          p_winner_id: string
        }
        Returns: Json
      }
      update_user_elo: {
        Args: {
          k_factor?: number
          loser_id_param: string
          winner_id_param: string
        }
        Returns: Json
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
      use_voucher: {
        Args: {
          p_original_amount?: number
          p_session_id?: string
          p_user_id: string
          p_voucher_code: string
        }
        Returns: Json
      }
      user_has_rank: { Args: { user_id: string }; Returns: boolean }
      validate_youtube_video_id: {
        Args: { video_id: string }
        Returns: boolean
      }
    }
    Enums: {
      match_status: "pending" | "in_progress" | "completed"
      post_type:
        | "text"
        | "image"
        | "video"
        | "tournament_share"
        | "tournament_match"
      request_status: "pending" | "approved" | "rejected"
      skill_level: "beginner" | "intermediate" | "advanced" | "professional"
      tournament_status: "upcoming" | "ongoing" | "completed" | "cancelled"
      user_role: "player" | "club_owner" | "admin" | "organizer" | "moderator"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      match_status: ["pending", "in_progress", "completed"],
      post_type: [
        "text",
        "image",
        "video",
        "tournament_share",
        "tournament_match",
      ],
      request_status: ["pending", "approved", "rejected"],
      skill_level: ["beginner", "intermediate", "advanced", "professional"],
      tournament_status: ["upcoming", "ongoing", "completed", "cancelled"],
      user_role: ["player", "club_owner", "admin", "organizer", "moderator"],
    },
  },
} as const
