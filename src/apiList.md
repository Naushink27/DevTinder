## DevTinder API
   ### authRouter 
   * POST/ signup
   * POST/ login
   * POST/ logout

   ### profileRouter
    * GET/ profile/view
    * PATCH/ profile/edit
    * PATCH/ profile/password
    
   ### connectionRequestRouter
    * POST/ request/send/ignored/:userId
    * POST/ request/send/interested/:userId
    * POST/ request/review/accept/:userId
    * POST/ request/review/reject/:userId

   ### userRouter
    * GET/ user/connections
    * GET/ user/request
    * GET/ user/feed