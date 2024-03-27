import { React, useState } from "react";
import News from "./News";
import { Container, Row, Col } from "react-bootstrap";
import ShareModal from "./ShareModal";
function TopNews({ newsData: newsList }) {
  newsList = newsList.slice(0, 20);
  const [show, setShow] = useState(false);
  const [selectedNews, setSelectedNews] = useState(newsList[0]);
  function onclick(newsItem) {
    setSelectedNews(newsItem);
    setShow(true);
  }
  return (
    <Container className="top-news">
      <Row>
        {newsList.map((newsItem, index) => (
          <Col sm={12} md={6} lg={6}>
            <News
              image={newsItem.image}
              headline={newsItem.headline}
              source={newsItem.source}
              datetime={newsItem.datetime}
              summary={newsItem.summary}
              url={newsItem.url}
              onClick={onclick}
            />
          </Col>
        ))}
      </Row>
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
