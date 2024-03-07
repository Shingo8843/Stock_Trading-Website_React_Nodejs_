import News from "./News";
function TopNews() {
  var newsList = [
    {
      Source: "BBC",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Covid-19: UK to close all travel corridors from Monday",
      Description:
        "The prime minister says it is the right time to end the daily televised press briefings.",
      Url: "https://www.bbc.com/news/uk-55681861",
    },
    {
      Source: "CNN",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Biden unveils $1.9 trillion Covid relief package",
      Description:
        "The president-elect has unveiled a plan to help the US through the coronavirus pandemic.",
      Url: "https://www.cnn.com/2021/01/14/politics/biden-economic-relief-package-coronavirus/index.html",
    },
    {
      Source: "ABC",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Trump to leave Washington on morning of Biden's inauguration",
      Description:
        "The president will leave office on Wednesday morning, ahead of Joe Biden's inauguration.",
      Url: "https://abcnews.go.com/Politics/trump-leave-washington-morning-bidens-inauguration/story?id=75299064",
    },
    {
      Source: "NBC",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Biden to propose 8-year citizenship path, faster for DACA",
      Description:
        "The president-elect will propose an eight-year path to citizenship, faster for DACA recipients.",
      Url: "https://www.nbcnews.com",
    },
    {
      Source: "CBS",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Biden to propose 8-year citizenship path, faster for DACA",
      Description:
        "The president-elect will propose an eight-year path to citizenship, faster for DACA recipients.",
      Url: "https://www.cbsnews.com",
    },
  ];
  return (
    <div className="topnews">
      {newsList.map((newsItem, index) => (
        <News
          key={index}
          source={newsItem.Source}
          publishedDate={newsItem.PublishedDate}
          title={newsItem.Title}
          description={newsItem.Description}
          url={newsItem.Url}
        />
      ))}
    </div>
  );
}
export default TopNews;
