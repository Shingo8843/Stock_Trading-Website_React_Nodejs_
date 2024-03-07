function Button() {
  let count = 0;
  const handleClick = (name) => {
    console.log("Button clicked!");
    count++;
    console.log("Button clicked " + count + " times, " + name);
  };
  return <button onClick={() => handleClick("SSS")}>Click me </button>;
}
export default Button;
