import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <h1 class="text-3xl font-bold underline text-center mt-10">
        Hello world!
      </h1>
      <div className="flex flex-col items-center justify-center pt-20 ">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
