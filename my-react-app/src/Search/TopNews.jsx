import News from "./News";
function TopNews(props) {
  const { newsList } = props;
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
