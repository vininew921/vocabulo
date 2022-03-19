import Head from 'next/head';
import Game from '../components/Game';
import Tutorial from '../components/Tutorial';

const Home = () => {
  return (
    <>
      <Head>
        <title>Vocábulo</title>
      </Head>
      <div className='bg-gray-900 grid h-screen place-items-center'>
        <main>
          <Game />
        </main>
      </div>
      <footer className='hidden md:inline absolute text-white top-2 left-2'>
        <div
          className='flex hover:outline rounded-md p-2 hover:cursor-pointer'
          onClick={() =>
            window.open('https://github.com/vininew921/', '_blank')
          }
        >
          <svg viewBox='430.977 241.693 24 23.408' width='24' height='23.408'>
            <path
              d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
              transform='matrix(1, 0, 0, 1, 430.977417, 241.693268)'
              style={{ fill: 'rgb(255, 255, 255)' }}
            ></path>
          </svg>
          <a className='text-white font-bold ml-2'>Author</a>
        </div>
      </footer>

      <Tutorial />
    </>
  );
};

export default Home;
