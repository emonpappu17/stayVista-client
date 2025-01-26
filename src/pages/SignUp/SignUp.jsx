import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from '../../api/utils';


const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0] // value return kore na ekti array return kore karon anek gula chobi hote pare
    // const formData = new FormData();
    // console.log(formData);
    // formData.append('image', image)

    try {
      setLoading(true)
      //  1. Upload Image and Get Image Url
      // const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      //   formData
      // )
      // console.log('got url', data.data.display_url);
      const image_url = await imageUpload(image)
      console.log(image_url);

      // 2. User Registration
      const result = await createUser(email, password)
      console.log(result);

      // 3. Save username and photo in firebase
      await updateUserProfile(name, image_url)
      navigate('/')
      toast.success('Signup Successful')
    }
    catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  // handle google signin
  const handleGoogleSignIn = async () => {

    try {
      await signInWithGoogle()
      navigate('/')
      toast.success('Signup Successful')
    }
    catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen border-red-400 border'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold '>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='space-y-6 '
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button disabled={loading} onClick={handleGoogleSignIn} className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer '>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp







// import { Link, useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
// import useAuth from '../../hooks/useAuth';
// import toast from 'react-hot-toast';
// import { TbFidgetSpinner } from 'react-icons/tb';
// import { imageUpload } from '../../api/utils';
// import { useActionState } from 'react';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const { createUser, signInWithGoogle, updateUserProfile } = useAuth();

//   // Action for handling form submission
//   const [formState, submitFormAction, isFormPending] = useActionState(
//     async (_, formData) => {
//       const name = formData.get('name');
//       const email = formData.get('email');
//       const password = formData.get('password');
//       const image = formData.get('image');

//       try {
//         // 1. Upload Image and Get Image URL
//         const image_url = await imageUpload(image);

//         // 2. User Registration
//         const result = await createUser(email, password);

//         // 3. Save username and photo in Firebase
//         await updateUserProfile(name, image_url);

//         // Navigate to the home page
//         navigate('/');
//         toast.success('Signup Successful');
//         return null; // No error
//       } catch (err) {
//         toast.error(err.message);
//         return err.message; // Return error message
//       }
//     },
//     null
//   );

//   // Action for handling Google sign-in
//   const [googleState, submitGoogleAction, isGooglePending] = useActionState(
//     async () => {
//       try {
//         await signInWithGoogle();
//         navigate('/');
//         toast.success('Signup Successful');
//         return null; // No error
//       } catch (err) {
//         toast.error(err.message);
//         return err.message; // Return error message
//       }
//     },
//     null
//   );

//   return (
//     <div className='flex justify-center items-center min-h-screen border-red-400 border'>
//       <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
//         <div className='mb-8 text-center'>
//           <h1 className='my-3 text-4xl font-bold '>Sign Up</h1>
//           <p className='text-sm text-gray-400'>Welcome to StayVista</p>
//         </div>
//         <form
//           action={submitFormAction}
//           className='space-y-6'
//         >
//           <div className='space-y-4'>
//             <div>
//               <label htmlFor='name' className='block mb-2 text-sm'>
//                 Name
//               </label>
//               <input
//                 type='text'
//                 name='name'
//                 id='name'
//                 placeholder='Enter Your Name Here'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//             </div>
//             <div>
//               <label htmlFor='image' className='block mb-2 text-sm'>
//                 Select Image:
//               </label>
//               <input
//                 required
//                 type='file'
//                 id='image'
//                 name='image'
//                 accept='image/*'
//               />
//             </div>
//             <div>
//               <label htmlFor='email' className='block mb-2 text-sm'>
//                 Email address
//               </label>
//               <input
//                 type='email'
//                 name='email'
//                 id='email'
//                 required
//                 placeholder='Enter Your Email Here'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//             </div>
//             <div>
//               <div className='flex justify-between'>
//                 <label htmlFor='password' className='text-sm mb-2'>
//                   Password
//                 </label>
//               </div>
//               <input
//                 type='password'
//                 name='password'
//                 autoComplete='new-password'
//                 id='password'
//                 required
//                 placeholder='*******'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
//               />
//             </div>
//           </div>
//           <div>
//             <button
//               disabled={isFormPending}
//               type='submit'
//               className='bg-rose-500 w-full rounded-md py-3 text-white'
//             >
//               {isFormPending ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
//             </button>
//           </div>
//         </form>
//         <div className='flex items-center pt-4 space-x-1'>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//           <p className='px-3 text-sm dark:text-gray-400'>
//             Signup with social accounts
//           </p>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//         </div>
//         <button
//           disabled={isGooglePending}
//           onClick={submitGoogleAction}
//           className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer '
//         >
//           <FcGoogle size={32} />
//           <p>Continue with Google</p>
//         </button>
//         <p className='px-6 text-sm text-center text-gray-400'>
//           Already have an account?{' '}
//           <Link
//             to='/login'
//             className='hover:underline hover:text-rose-500 text-gray-600'
//           >
//             Login
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

