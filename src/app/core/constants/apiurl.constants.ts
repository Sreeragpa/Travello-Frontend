export const API_URLS = {
    POSTS: {
      BASE: '/api/posts',
      ADD_POST: '/add-post',
      GET_USER_POSTS: '/get-userpost',
      GET_ALL_POSTS: '/get-post',
      GET_SINGLE_POST: (postId: string) => `/get-post/${postId}`,
      LIKE_POST: '/like',
      UNLIKE_POST: '/unlike',
      SAVE_POST: '/save-post',
      UNSAVE_POST: (postId: string) => `/unsave-post/${postId}`,
      SAVED_POST: '/saved-post',
      POST_COUNT: '/count',
      GET_SAVED_POST: '/saved-post',
      GET_POST_COUNT: '/count',
    },

    AUTH: {
        BASE: '/api/auth',
        SIGNIN: '/signin',
        SIGNUP: '/signup',
        VERIFY_OTP: '/verify-otp',
        CHECK_AUTH: '/check-auth',
        LOGOUT: '/logout'
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
      GET_FOLLOW_COUNT: '/count'
    },

    MAP: {
      BASE: 'https://api.geoapify.com/v1/geocode',
      AUTO_COMPLETE: (text: string,apikey: string)=> `/autocomplete?text=${text}&apiKey=${apikey}`
    },

    NOTIFICATION: {
      BASE: '/api/notification',
      GET_NOTIFICATION: '/get-notification'
    },

    TRIPS: {
      BASE: '/api/trip',
      ADD_TRIP: '/add-trip',
      GET_TRIPS: '/get-trip',
      GET_SINGLE_TRIP: (tripId: string) => `/get-trip/${tripId}`,
      JOIN_TRIP: '/join-trip',
      ACCEPT_TRIP_REQUEST: '/accept-request',
      TRIP_COUNT: '/count',
      USER_TRIPS: '/user-trips',
      EDIT_TRIP: (tripId: string) => `/edit-trip/${tripId}`
  },

  USER: {
    BASE: '/api/user',
    UPDATE_PROFILE_IMG: '/add-profileimg',
    GET_USER: '/get-user',
    UPDATE_PASSWORD: '/update-password',
    UPDATE_PROFILE: '/update-profile',
  }



  };
  