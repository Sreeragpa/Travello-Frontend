export const API_URLS = {
    POSTS: {
      BASE: '/api/posts',
      ADD_POST: '/add-post',
      GET_USER_POSTS: '/get-userpost',
      GET_PROFILE_POSTS: (profileid: string)=> `/get-userpost/${profileid}`,
      GET_ALL_POSTS: (page: number)=> `/get-post?page=${page}`,
      GET_SINGLE_POST: (postId: string) => `/get-post/${postId}`,
      LIKE_POST: '/like',
      UNLIKE_POST: '/unlike',
      SAVE_POST: '/save-post',
      UNSAVE_POST: (postId: string) => `/unsave-post/${postId}`,
      SAVED_POST: '/saved-post',
      POST_COUNT: '/count',
      GET_SAVED_POST: '/saved-post',
      GET_POST_COUNT: '/count',
      GET_PROFILE_POST_COUNT: (profileid: string)=>`/count/${profileid}`,
    },

    AUTH: {
        BASE: '/api/auth',
        SIGNIN: '/signin',
        SIGNUP: '/signup',
        VERIFY_OTP: '/verify-otp',
        CHECK_AUTH: '/check-auth',
        LOGOUT: '/logout',
        GET_TOKEN:'/token'
    },

    COMMENT: {
      BASE: '/api/comment',
      GET_COMMENT: (postid: string) => `/get-comment/${postid}`,
      ADD_COMMENT: '/add-comment'
    },

    FOLLOW: {
      BASE: '/api/follow',
      FOLLOW: '/follow',
      UNFOLLOW: '/unfollow',
      GET_FOLLOW_COUNT: '/count',
      GET_PROFILE_FOLLOW_COUNT: (profileid: string)=> `/count/${profileid}`,

      GET_FOLLOWING_USERS: '/following'
    },

    MAP: {
      BASE: 'https://api.geoapify.com/v1/geocode',
      AUTO_COMPLETE: (text: string,apikey: string)=> `/autocomplete?text=${text}&apiKey=${apikey}`
    },

    NOTIFICATION: {
      BASE: '/api/notification',
      GET_NOTIFICATION: '/get-notification',
      GET_COUNT: '/count',
      MARK_AS_READ: '/mark-read'
    },

    TRIPS: {
      BASE: '/api/trip',
      ADD_TRIP: '/add-trip',
      GET_TRIPS: '/get-trip',
      GET_SINGLE_TRIP: (tripId: string) => `/get-trip/${tripId}`,
      JOIN_TRIP: '/join-trip',
      ACCEPT_TRIP_REQUEST: '/accept-request',
      TRIP_COUNT: '/count',
      PROFILE_TRIP_COUNT: (profileid: string)=>`/count/${profileid}`,
      USER_TRIPS: '/user-trips',
      USER_PROFILE_TRIPS: (profileid: string)=>`/user-trips/${profileid}`,
      EDIT_TRIP: (tripId: string) => `/edit-trip/${tripId}`,
      SEARCH_TRIP:(searchKey:string) => `/search-trip?search=${searchKey}`,
  },

  USER: {
    BASE: '/api/user',
    UPDATE_PROFILE_IMG: '/add-profileimg',
    GET_USER: '/get-user',
    GET_USER_PROFILE:(profileid: string)=> `/get-user/${profileid}`,
    UPDATE_PASSWORD: '/update-password',
    UPDATE_PROFILE: '/update-profile',
    SEARCH_USERS:(searchKey:string) => `/search-user?search=${searchKey}`,
  },

  CONVERSATION: {
    BASE: '/api/conversation',
    GET_CONVERSATION: '/get-conversation',
    GET_SINGLE_CONVERSATION: (conversationid: string)=> `/get-conversation/${conversationid}`,
    ADD_CONVERSATION: '/add-conversation',
    GET_UNREAD_COUNT: '/unread-conversation/count'
  },

  MESSAGE: {
    BASE: '/api/message',
    GET_MESSAGE: '/get-message',
    SEND_MESSAGE: '/send-message'
  }



  };
  