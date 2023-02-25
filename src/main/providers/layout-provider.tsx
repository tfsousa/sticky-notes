import * as Layouts from '~/app/shared/layouts'

import { type LayoutOptions } from '../types'

type Props = {
  children: React.ReactNode
  layoutOptions?: LayoutOptions
}

export const LayoutProvider = ({
  children,
  layoutOptions = 'DefaultLayout'
}: Props) => {
  const Layout = Layouts[layoutOptions]

  return <Layout>{children}</Layout>
}
