import React, {Component, PropTypes} from 'react';
import ReactNative, {
  Text,
  View,
  StyleSheet,
  ListView,
} from 'react-native';

const Appsee = require('react-native-appsee');

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';
const hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

const _rowRefs = [];

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    // this._rowRefs = [];
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._genRows({}))
    }
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}/>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    const rowHash = Math.abs(hashCode(rowData));
    return (
      <View style={styles.row}>
        <Text style={{width: 60}}>{rowData}</Text>
        <Text
          style={styles.text}
          ref={(r) => {
            _rowRefs[rowID] = r
          }}>
          {LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
        </Text>
      </View>
    );
  }

  _genRows() {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      dataBlob.push('Row ' + ii + ' ');
    }
    return dataBlob;
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: rowID % 2 == 0 ? '#3B5998' : '#CCCCCC'
        }}
      />
    );
  }

  componentDidMount() {
    Appsee.start(API_KEY);
    _rowRefs.forEach((row) => {
      console.log('Marking view as sensitive');
      Appsee.markViewAsSensitive(row);
    });
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1
  }
});
