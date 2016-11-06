This is a pull to refresh component depend on react.

**Notice** only support touch event now.

## Install

```
npm i -S rc-pull-to-refresh@0.0.4
```

## Usage

### Use SimplePTR (see example)

```jsx
import SimplePTR from 'rc-pull-to-refresh/lib/SimplePTR';

// in component's render
render() {
  const { loading, dataSource } = this.state;

  return (
    <SimplePTR
      className="my-ptr"
      loading={loading}
      onRefresh={this.refresh}
    >
      {dataSource.map((data, index) =>
        <div key={index} style={{ height: 48 }}>{data}</div>
      )}
    </SimplePTR>
  );
}
```

### Use PullToRefresh (if you want a custom header)

```jsx
import PullToRefresh from 'rc-pull-to-refresh';

render() {
  const { loading, onRefresh, children, className, resistance } = this.props

  return (
    <PullToRefresh
      className={className}
      loading={loading}
      resistance={resistance}
      distanceToRefresh={60}
      header={{
        height: 60,
        render: this.renderHeader
      }}
      onRefresh={onRefresh}
    >
      {children}
    </PullToRefresh>
  )
}
```

## API

- onRefresh
    - func() (required)
- loading
    - bool (required)
- resistance
    - number
    - default: 2.5
    - The dragging resistance level, the higher the more you'll need to drag down.
- className
    - string
- style
    - object
- distanceToRefresh
    - PullToRefresh only
    - number
    - default: 60
- header
    - PullToRefresh only
    - object (required)
    - height
        - number (required)
        - header's height
    - render
        - func (required)
            - Object{ loading, canRefresh, offset }
        - header's render

## Development

```
npm i
npm run dev

open http://localhost:8080
```