import { React, useState } from "react";
import News from "./News";
import { Container } from "react-bootstrap";
import ShareModal from "./ShareModal";
function TopNews({ newsData: newsList }) {
  newsList = newsList.slice(0, 1);
  const [show, setShow] = useState(false);
  const [selectedNews, setSelectedNews] = useState(newsList[0]);
  function onclick(newsItem) {
    setSelectedNews(newsItem);
    setShow(true);
  }
  return (
    <Container className="top-news">
      {newsList.map((newsItem, index) => (
        <News
          image={newsItem.image}
          headline={newsItem.headline}
          source={newsItem.source}
          datetime={newsItem.datetime}
          summary={newsItem.summary}
          url={newsItem.url}
          onClick={onclick}
        />
      ))}
      <ShareModal
        show={show}
        onHide={() => setShow(false)}
        onShare={() => {}}
        image={selectedNews.image}
        headline={selectedNews.headline}
        source={selectedNews.source}
        datetime={selectedNews.datetime}
        summary={selectedNews.summary}
        url={selectedNews.url}
      />
    </Container>
  );
}
export default TopNews;
