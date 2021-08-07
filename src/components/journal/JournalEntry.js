import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, url, date }) => {
	const dispatch = useDispatch();
	const noteDate = moment(date);

	const handleEntry = () => {
		dispatch(
			activeNote(id, {
				title,
				body,
				url,
				date,
			})
		);
	};

	return (
		<div
			className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
			onClick={handleEntry}
		>
			{url && (
				<figure className="journal__entry-picture">
					<img alt={title} className="journal__entry-img" src={`${url}`}></img>
				</figure>
			)}

			<div className="journal__entry-body">
				<p className="journal__entry-title">{title}</p>
				<p className="journal__entry-content">{body}</p>
			</div>

			<div className="journal__entry-date-box">
				<span>{noteDate.format('dddd')}</span>
				<h4>{noteDate.format('Do')}</h4>
			</div>
		</div>
	);
};
