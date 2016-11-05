/**
 * Created by Frezc on 2016/11/5.
 */
import React from 'react';

function ArrowUp({ style, className }) {
  return (
    <svg style={style}
         className={className}
         viewBox="0 0 22 22">
      <polygon
        style={styles.common}
        points="11.5,16.5 11.5,6.75 15,9.5 15,8.5 11,5.5 7,8.5 7,9.5 10.502,6.75
          10.502,16.5"
      />
      <path
        style={styles.common}
        d="M22,11c0-6.075-4.925-11-11-11C4.925,0,0,4.925,0,11c0,6.075,4.925,11,11,11
          C17.075,22,22,17.075,22,11z M1,11C1,5.477,5.477,1,11,1c5.523,0,10,4.477,10,10s-4.477,10-10,10C5.477,21,1,16.523,1,11z"
      />
    </svg>
  )
}

const styles = {
  common: {
    fillRule: 'evenodd',
    clipRule: 'evenodd'
  }
}

export default ArrowUp
