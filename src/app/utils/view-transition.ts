export const startViewTransition = (callback: () => void) => {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    console.log('View transitions are not supported in this browser.');
    callback();
  }
};
