
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Dashbord from './pages/Dashbord.jsx'
import WriteArticle from './pages/WriteArticle.jsx'
import BlogTitles from './pages/BlogTitles.jsx'
import GenerateImages from './pages/GenerateImages.jsx'
import RemoveBackground from './pages/RemoveBackground.jsx'
import RemoveObjects from './pages/RemoveObjects.jsx'
import ReviewResume from './pages/ReviewResume.jsx'
import Community from './pages/Community.jsx'
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/clerk-react"
import { useEffect } from 'react'

const App = () => {
  const {getToken}= useAuth()
  // useEffect(()=>{
  //          getToken().then((token)=>console.log(token));
  // },[])

  useEffect(() => {
    const callAPI = async () => {
      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/ai/generate-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: "Write about AI in healthcare",
          length: 1000,
        }),
      });

      const text = await res.text();
      console.log(text);
    };

    callAPI();
  }, []);


  return (  
    <div className='min-h-screen bg-black text-white'>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<Home />} />

        {/* Protected Routes */}
        <Route 
          path='/ai/*' 
          element={
            <>
              <SignedIn>
                <Layout />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          <Route index element={<Dashbord />} />
          <Route path='write-article' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='generate-images' element={<GenerateImages />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='remove-object' element={<RemoveObjects />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='community' element={<Community />} />
        </Route>

        {/* Catch-all: redirect unknown routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App
