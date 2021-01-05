export const user = [
  {
    "first_name":"M",
    "last_name":"JAckson",
    "email":"jackson.novelty@gmail.com",
    "occupation":"Programming",
    "username":"jacks",
    "bio":"Software Developer",
    "address":"kk 509 st",
    "language":"Kinyarwanda",
    "password":"12345678",
    "profile_picture":"https://res.cloudinary.com/mjackson/image/upload/v1609304524/Screen_Shot_2020-12-29_at_08.21.43_qe7pem.png"
  }
]

export const signupState = {
    requesting: false,
    errorOpen: false,
    erro: ""
  }
export const locationsPayload = [
    {
      id: "c6028e0d-ef88-4693-ab49-f37669891724",
      LocationName: "Kigali",
      country: "Rwanda",
      description: "The land of a thousand hills",
      link: "https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/africa/downtown-kigali-rwanda.adapt.1900.1.jpg",
    }
  ]

export const accommodationsPayload = [
    {
      
        id: "0ce36391-2c08-3074-bddb-a4ea8cccbbc5",
        country: "Rwanda",
        city: "Kigali",
        title: "Marriot Hotel",
        description: "A serene environment for relaxation",
        photos: "https://cache.marriott.com/marriottassets/marriott/KGLMC/kglmc-exterior-0030-hor-feat.jpg",
    
    }
  ]

  export const accommodationState = {
    pending: false,
    accommodations: accommodationsPayload,
    error: null
  }

  export const locationState = {
    pending: false,
    locations: locationsPayload,
    error: null
  }

