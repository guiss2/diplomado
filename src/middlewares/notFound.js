export default function errorHandler(req, res, next) {
    res.status(404).json({ message: 'not found' });
}