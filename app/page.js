import { Open_Sans } from 'next/font/google'
import { ConfigProvider } from 'antd'

import Order from './components/Order'

import styles from './page.module.css'

const openSans = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function Home() {
  return (
    <main className={styles.main} style={openSans.style}>
      <ConfigProvider
        theme={{
        token: {
            fontFamily: 'inherit',
            colorTextBase: '#28293D'
          },
        }}
      >
        <Order />
      </ConfigProvider>
    </main>
  )
}
