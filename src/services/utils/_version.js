let version = '${lib_version}';

export function getVersion() {
  if (version && version.indexOf("${") == 0) {
    return "0.0.0"
  }
  return version;
}