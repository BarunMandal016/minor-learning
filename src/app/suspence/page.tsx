function page() {
  async function test() {
    console.log("test")
    await new Promise((resolve) => setTimeout(resolve, 5000))
  }
  test()
  return <div>page</div>
}

export default page
