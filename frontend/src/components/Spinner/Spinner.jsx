import React from 'react';

const Spinner = () => {

     const styles = {
          spinner_container: {
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               position: 'fixed',
               top: '50%',
               left: '50%',
               translate: '-50% -50%',
               background: 'rgba(0,0,0,.5)',
               height: '100%',
               width: '100%',
               zIndex: '9999'
          },
          spinner: {

          }

     }

     return (
          <div className='spinner_container' style={styles.spinner_container}>
               <div className="spinner" style={styles.spinner}>
                    spinner
               </div>
          </div>
     );

}

export default Spinner;
