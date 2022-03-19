import { useState } from 'react';
import { PositionStatus } from '../types/appTypes';
import WordChar from './WordChar';

const Tutorial = () => {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <>
      {showTutorial ? (
        <div
          className='fixed z-10 inset-0 overflow-y-auto'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity'
              aria-hidden='true'
            ></div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-gray-900 rounded-xl outline outline-4 outline-black text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 '>
                <div className='sm:flex sm:items-start bg-gray-900'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left bg-gray-900 '>
                    <h3
                      className='text-sm md:text-md lg:text-xl leading-6 font-medium text-white'
                      id='modal-title'
                    >
                      Como jogar Vocábulo
                    </h3>
                    <div className='mt-2  text-sm md:text-md lg:text-xl'>
                      <div className='text-sm font-bold text-white md:text-md lg:text-xl'>
                        Adivinhe a palavra de 5 letras em 5 tentativas!
                        <br />
                        <br />
                        Enviar resposta:
                        <br />
                        <p className='text-white  text-sm md:text-md lg:text-xl'>
                          ENVIAR ou ENTER
                        </p>
                        <br />
                        Respostas:
                        <br />
                        <div className='w-full text-sm md:text-md lg:text-xl'>
                          <div className='flex justify-start text-left items-center'>
                            <WordChar
                              char={'A'}
                              position={{
                                char: 'A',
                                status: PositionStatus.Correct,
                              }}
                              invalidWordParent={undefined}
                              parentWordPosition={undefined}
                              relativePosition={undefined}
                            />
                            <p className='ml-2'>
                              Letra correta na posição correta
                            </p>
                          </div>
                          <br />
                          <div className='flex justify-start text-left items-center'>
                            <WordChar
                              char={'B'}
                              position={{
                                char: 'B',
                                status: PositionStatus.Misplaced,
                              }}
                              invalidWordParent={undefined}
                              parentWordPosition={undefined}
                              relativePosition={undefined}
                            />
                            <p className='ml-2'>
                              Letra correta na posição errada
                            </p>
                          </div>
                          <br />
                          <div className='flex justify-start text-left items-center w-full '>
                            <WordChar
                              char={'C'}
                              position={{
                                char: 'C',
                                status: PositionStatus.Wrong,
                              }}
                              invalidWordParent={undefined}
                              parentWordPosition={undefined}
                              relativePosition={undefined}
                            />
                            <p className='ml-2'>Letra não existe na palavra</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-lg border px-10 py-2 
                  bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => setShowTutorial(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Tutorial;
