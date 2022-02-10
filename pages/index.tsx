import Head from 'next/head';
import Game from '../components/Game';

const Home = () => {
  return (
    <>
      <Head>
        <title>Wordle</title>
      </Head>
      <div className='bg-gray-900 grid h-screen place-items-center'>
        <main>
          <Game />
        </main>
      </div>
    </>
  );
};

export default Home;
