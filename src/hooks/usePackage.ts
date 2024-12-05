import packageJson from '../../package.json'

const { dependencies, devDependencies, name, version } = packageJson

export const usePackage = () => ({
  name,
  version,
  dependencies,
  devDependencies,
})
